import React, {Component} from 'react';
// in ECMAScript 6
import {BootstrapTable, DeleteButton} from 'react-bootstrap-table';
import MyFetch from '../../functions';
import { Link } from 'react-router'

import {
    /* reducer as formReducer,
    formValueSelector,
    Field,
    reduxForm,
    initialize,

    stopSubmit,
    startSubmit,
    FieldArray,
     FormSection, */
    touched,
    change
} from 'redux-form'

let selectRowProp = {
    mode: "checkbox",
    clickToSelect: true,
    bgColor: "rgb(238, 193, 213)"
};

let createCustomToolBar = props => {
    /**
     *  This function only pass one argument, is props object which has following properties
     *
     *  {
   *    components: {  // here are all the components
   *      exportCSVBtn,  // export CSV button JSX
   *      insertBtn,  // insert button JSX
   *      deleteBtn,  // delete button JSX
   *      showSelectedOnlyBtn,  // show selected button JSX
   *      searchPanel,  // search panel JSX
   *      btnGroup,  // button groups JSX
   *      searchField,  // search field JSX
   *      clearBtn  // clear search field JSX
   *    },
   *    event: {  // here are all the related event you may use it
   *      openInsertModal,   // call it to open insert modal
   *      closeInsertModal,  // call it to close insert modal
   *      dropRow,   // call it to drop row
   *      showOnlyToogle,   // call it to toogle show only selections
   *      exportCSV,   // call it to export CSV file
   *      search  // call it with search text to search table
   *    }
   *  }
     *
     **/


    return (
        <div style={ {margin: '15px'} }>
            { props.components.btnGroup }
            <div className='col-xs-8 col-sm-4 col-md-4 col-lg-2'>
                { props.components.searchPanel }
            </div>
        </div>
    );
};
let handleDeleteButtonClick = (onClick) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
  //  console.log('This is my custom function for DeleteButton click event');
  //  console.log(this);
    onClick();
};
let createCustomDeleteButton = (onClick) => {

    return (
        <DeleteButton
            btnText='Delete'
            btnContextual='btn-warning'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={ () => handleDeleteButtonClick(onClick) }/>
    );
};
let onRowClick = (row) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
  //  console.log('onRowClick');
 //   console.log(row);

};
class FilterableTable extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.data,
            offline: this.props.fetchUrl==null,
            simple: this.props.simple!=null,
            noDataText: 'Nebyla nalezena žádná data'
        };
        let opt=this.props.options;
        this.onDeleteRow = this.onDeleteRow.bind(this);
        this.createCustomModalHeader = this.createCustomModalHeader.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.beforeClose = this.beforeClose.bind(this);
        this.handleInsertedRow = this.handleInsertedRow.bind(this);
        this.onBeforeSaveCell = this.onBeforeSaveCell.bind(this);
        this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
        this.handleinitialize = this.handleinitialize.bind(this);
        this.handledelete = this.handledelete.bind(this);
        this.handleupdate = this.handleupdate.bind(this);
        this.editable = this.editable.bind(this);

        this.options = {
            withoutNoDataText: true,
            noDataText: "aaaa",
            toolBar: createCustomToolBar,
            deleteBtn: createCustomDeleteButton,
            onRowClick: onRowClick,
            onDeleteRow: this.onDeleteRow,
            insertModalHeader: this.createCustomModalHeader,
            onAddRow: this.handleInsertedRow,
            defaultSortName: (opt.sortname == null) ? "name" : opt.sortname,  // default sort column name
            defaultSortOrder: 'desc'  // default sort order
        };
        this.cellEditProp = {
            mode: 'click',
            blurToSave: true,
            beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
            afterSaveCell: this.onAfterSaveCell,  // a hook for after saving cell
            // nonEditableRows: this.props.editable || this.editable
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data:nextProps.data
        });
    }
    editable() {
        return ['price', 'deliverytime'];
    }
    onBeforeSaveCell(row, cellName, cellValue) {
        row[cellName] = cellValue;
        if(this.state.offline) {
            return true;
        }else{
        return this.handleupdate(row);
    }
        // You can do any validation on here for editing value,
        // return false for reject the editing
    }
    onAfterSaveCell(row, cellName, cellValue) {
       let data=this.state.data;
        data.forEach(function(obj) {
            if (obj._id === row._id) {
                obj.name=row.name;
            }
        });

        if(this.state.offline) {
            this.props.dispatch(change('NewOrderForm', 'products', data));
        //    console.log(data);
            return true;
        }
        /*  let rowStr = '';
         for (const prop in row) {
         rowStr += prop + ': ' + row[prop] + '\n';
         }

         alert('Thw whole row :\n' + rowStr+'was updated');*/

        //Napsat hlasku ze byla updatovana
    }
    handleModalClose(closeModal) {
        // Custom your onCloseModal event here,
        // it's not necessary to implement this function if you have no any process before modal close
      //  console.log('This is my custom function for modal close event');
        closeModal();
    }
    beforeClose(e) {
        alert(`[Custom Event]: Before modal close event triggered!`);
    }
    createCustomModalHeader(onClose, onSave) {
        return (
            <div className='modal-header'>
                <h4 className="modal-title">{this.props.options.modalNew}</h4>
                <button type="button" className="close" aria-label="Close" onClick={ onClose }>
                    <span aria-hidden="true">×</span></button>
            </div>
        );

    }
    onDeleteRow(rows) {
        rows.forEach((id) => {
            this.handledelete(id);
        });
    }
    componentDidMount() {
        if(!this.state.offline)
        this.handleinitialize();
    }
    handledelete(values) {
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        let url = this.props.fetchUrl + values;
        let method = 'DELETE';
        let fetchData = {
            method: method,
            headers: headers
        };
        MyFetch(url, fetchData).then(data => {
      //      console.log(data);
        }).catch(err => {
            this.forceUpdate();
      //      console.error(err.msg);
        });
    }
    handleinitialize() {
        let url = this.props.fetchUrl;

        MyFetch(url)
            .then(data => {
                this.setState({data: data})
            }).catch(err => {
            this.forceUpdate();
            this.setState({noDataText: "Chyba připojení k serveru"})

        //    console.error(err.msg);
        });
    }
    handleInsertedRow(values) {
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        let url = this.props.fetchUrl;
        let method = 'POST';
        let fetchData = {
            method: method,
            headers: headers,
            body: JSON.stringify(values)
        };
        MyFetch(url, fetchData).then(data => {

        }).catch(err => {
            this.forceUpdate();
        });
    }
    handleupdate(values) {
        let url = this.props.fetchUrl + values._id;
        let method = 'PUT';
        let fetchData = {
            method: method,
            body: JSON.stringify(values)
        };
        MyFetch(url, fetchData).then(data => {
            return true;
        }).catch(err => {
            return false;
        //    console.error(err.msg);
        });
    }
    trClassFormat(row, rowIndex) {
        // row is the current row data
        if (row.min_description == "") {
            return "warning";
        }
        if (row.count < 10) {
            return "info";
        }
        if (row.visible == true) {
            return "active";
        }
        return "";  // return class name.
    }
    render() {
       function buttonFormatter(cell, row){
            return (
            <Link to={'/products/'+row._id}>
                <button type="button" className="btn btn-success">upravit</button>
            </Link>);
        }

          return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-align-justify"></i> Striped Table
                            </div>

                            <BootstrapTable
                                {...this.props}
                                cellEdit={ this.cellEditProp }
                                data={this.state.data}
                                selectRow={selectRowProp}
                                hover={true}
                                height='100%'
                                condensed={this.state.simple}
                                pagination={!this.state.simple}
                                insertRow={!this.state.simple}
                                deleteRow={!this.state.simple}
                                search={!this.state.simple}
                                options={this.options}
                                trClassName={ this.trClassFormat }
                                columnFilter={!this.state.simple}
                                multiColumnSearch
                                ignoreSinglePage
                                multiColumnSort={ 2 }
                            >
                                {this.props.children}
                            </BootstrapTable>
                            {this.state.chyba && <span>{this.state.chyba}</span>}
                        </div>
                    </div>
                </div>

            </div>
    )
    }
    }
    export default FilterableTable;
