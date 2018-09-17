//Packages Import
import React, {Component} from 'react';
// in ECMAScript 6
import {
    BootstrapTable,
    customMultiSelect,
    DeleteButton,
    InsertModalFooter,
    SearchField,
    TableHeaderColumn
} from 'react-bootstrap-table';

import {Link} from 'react-router-dom'

import {touched} from 'redux-form'
//Funsctions import
import MyFetch from '../../functions';

//Funsction definitions

const selectRowProp = {
    mode: 'checkbox',
    customComponent: customMultiSelect
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
        <div style={{margin: "5px"}}>
            <div className='float-left col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                {props.components.btnGroup}
            </div>
            <div className='float-right col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                {props.components.searchPanel}
            </div>
        </div>
    );
};

let handleDeleteButtonClick = (onClick) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick

    onClick();
};
let createCustomDeleteButton = (onClick) => {

    return (
        <DeleteButton
            btnText='Delete'
            btnContextual='btn-warning'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={() => handleDeleteButtonClick(onClick)}/>
    );
};
let onRowClick = (row) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick


};


export class FilterTable extends Component {

    renderPaginationPanel = (props) => {
        return (
            <div>
                <div className="pagination">{props.components.pageList}</div>
                <div className="input-group-btn">
                    <div>
                        {props.components.sizePerPageDropdown}
                    </div>
                </div>
            </div>
        );
    };
    renderSizePerPageDropDown = props => {
        return (
            <div className='input-group-btn'>
                {
                    [10, 25, 50, 100].map((n, idx) => {
                        const isActive = (n === props.currSizePerPage) ? 'active' : null;
                        return (
                            <button key={idx} type='button' className={`btn btn-info ${isActive}`}
                                    onClick={() => props.changeSizePerPage(n)}>{n}</button>
                        );
                    })
                }
            </div>
        );
    };
    createCustomSearchField = (props) => {
        return (
            <SearchField
                className="form-control"
                defaultValue={props.defaultSearch}
                placeholder={props.searchPlaceholder}/>

        );
    };
    createCustomModalFooter = (closeModal, save) => {
        return (
            <InsertModalFooter
                saveBtnText='Přidat'
                closeBtnText='Zavřít'
                closeBtnContextual='Varování'
                saveBtnContextual='Uloženo'
                closeBtnClass='btn btn-sm btn-danger'
                saveBtnClass='btn btn-sm btn-primary'
                /*    beforeClose={ this.beforeClose }
                 beforeSave={ this.beforeSave }
                 onModalClose={ () => this.handleModalClose(closeModal) }
                 onSave={ () => this.handleSave(save) }*/

            />
        );

        // If you want have more power to custom the child of InsertModalFooter,
        // you can do it like following
        // return (
        //   <InsertModalFooter
        //     onModalClose={ () => this.handleModalClose(closeModal) }
        //     onSave={ () => this.handleSave(save) }>
        //     { ... }
        //   </InsertModalFooter>
        // );
    };
    CustomInsert = (onClick) => {
        return (
            <Link to={this.opt.actionsURL + 'new'}>
                <button type="button"
                        className="btn btn-info react-bs-table-add-btn ">{this.state.customNewText}</button>
            </Link>)
    };

    constructor(props) {
        super(props);

        //Derive from props
        let customNew = false;

        if (this.props.customNew != null) {
            customNew = this.CustomInsert;
        }
        let data = [];
        if (this.props.data)
            data = this.props.data;

        //set init state
        this.state = {
            data: data,
            offline: this.props.fetchUrl == null,
            simple: this.props.simple != null,
            customNew: customNew,
            customNewText: this.props.customNewText,
            globalerr: null
        };

        this.opt = this.props.options;

        let insertBtn = null;
        if (this.state.customNew)
            insertBtn = this.state.customNew;

        this.options = {
            insertModalFooter: this.createCustomModalFooter,
            //  onExportToCSV: this.onExportToCSV,
            searchPosition: 'right',
            searchField: this.createCustomSearchField,
            exportCSVText: 'Exportovat',
            insertText: 'Nový',
            deleteText: 'Odstranit',
            saveText: 'Uložit',
            closeText: 'Zavřít',
            handleConfirmDeleteRow: this.customConfirm,
            toolBar: createCustomToolBar,
            deleteBtn: createCustomDeleteButton,
            onRowClick: onRowClick,
            onDeleteRow: this.onDeleteRow,
            insertModalHeader: this.createCustomModalHeader,
            onAddRow: this.handleInsertedRow,
            //    defaultSortName: (this.opt==null || this.opt.sortname == null) ? "name" : this.opt.sortname,  // default sort column name
            defaultSortOrder: 'desc',  // default sort order
            insertBtn: insertBtn,
            paginationPanel: this.renderPaginationPanel,
            sizePerPageDropDown: this.renderSizePerPageDropDown
        };
        this.cellEditProp = {
            mode: 'click',
            blurToSave: true,
            beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
            afterSaveCell: this.onAfterSaveCell,  // a hook for after saving cell
            // nonEditableRows: this.props.editable || this.editable
        };

        //Bind all
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
        this.customConfirm = this.customConfirm.bind(this);
        this.createCustomModalFooter = this.createCustomModalFooter.bind(this);
        this.renderPaginationPanel = this.renderPaginationPanel.bind(this);
        this.renderSizePerPageDropDown = this.renderSizePerPageDropDown.bind(this);

        this.CustomInsert = this.CustomInsert.bind(this);
        this.createCustomSearchField = this.createCustomSearchField.bind(this);
        this.onExportToCSV = this.onExportToCSV.bind(this);

    }

    handleinitialize() {
        let url = this.props.fetchUrl;

        MyFetch(url)
            .then(data => {
                if (data.user != null) {
                    data.fullname = data.user.firstname + " " + data.user.lastname;
                }

                if (data)
                    this.setState({data: data})
            }).catch(error => {

            if (error.ok == false && error.status == 500) {
                this.setState({globalerr: "Chyba připojení k serveru"});
            }

            this.forceUpdate();
        });
    }

    onExportToCSV(row) {
        if (this.opt && this.opt.CSV)
            return this.opt.CSV(row);
        return row; // must return the data which you want to be exported
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }

    editable() {
        return ['price', 'deliverytime'];
    }

    onBeforeSaveCell(row, cellName, cellValue) {
        row[cellName] = cellValue;
        if (this.state.offline) {
            return true;
        } else {
            return this.handleupdate(row);
        }
        // You can do any validation on here for editing value,
        // return false for reject the editing
    }

    onAfterSaveCell(row, cellName, cellValue) {
        let data = this.state.data;
        data.forEach(function (obj) {
            if (obj._id === row._id) {
                obj.name = row.name;
            }
        });


        if (this.state.offline) {
            // this.props.dispatch(change('NewOrderForm', 'products', data));
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
        console.log('This is my custom function for modal close event');
        closeModal();
    }

    beforeClose(e) {
        alert(`[Custom Event]: Before modal close event triggered!`);
    }

    createCustomModalHeader(onClose, onSave) {
        return (
            <div className='modal-header'>
                <h4 className="modal-title">{this.props.options.modalNew}</h4>
                <button type="button" className="close" aria-label="Close" onClick={onClose}>
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
        if (!this.state.offline)
            this.handleinitialize();
    }

    handledelete(values) {
        var headers = new Headers({
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
            console.log("ok");
            console.log(data);

        }).catch(err => {
            console.log("nook");
            console.log(err);

            this.forceUpdate();
        });
    }

    handleInsertedRow(values) {
        var headers = new Headers({
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
            console.error(err);
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
        });
    }

    trClassFormat(row, rowIndex) {
        // row is the current row data
        if (row.min_description === "") {
            return "warning";
        }
        if (row.count < 10) {
            return "info";
        }
        if (row.visible === true) {
            return "active";
        }
        return "";  // return class name.
    }

    customConfirm(next, dropRowKeys) {
        const dropRowKeysStr = dropRowKeys.join(',');
        if (this.confirm(`Opravdu chcete odstranit ${dropRowKeysStr}?`)) {
            // If the confirmation is true, call the function that
            // continues the deletion of the record.
            next();
        }
    }

    render() {

        //generate columns
        let cols = [];
        this.props.dataModel.forEach((item) => {
            cols.push(
                <TableHeaderColumn
                    key={item.label}
                    dataField={item.field}
                    isKey={item.key}
                    dataAlign={item.dataAlign}
                    dataSort={item.sort}
                    hidden={item.hidden}
                    editable={item.editable}
                    dataFormat={item.dataFormat}
                    width={item.width}
                    filter={item.filter}
                    filterValue={item.filterType}
                    filterFormatted={item.filterFormatted}
                    formatExtraData={item.formatExtraData}
                >
                    {item.label}
                </TableHeaderColumn>
            );
        });

        function buttonFormatter(cell, row) {
            return (

                <Link to={this.opt.actionsURL + row._id}>
                    <button type="button" className="btn btn-success">upravit</button>
                </Link>);
        }

        if (this.opt && this.opt.actions) {
            cols.push(
                <TableHeaderColumn
                    key="akce"
                    dataField="button"
                    isKey={false}
                    dataAlign="center"
                    dataSort={true}
                    hidden={false}
                    editable={false}
                    dataFormat={this.opt.actionsFormatter == null ? buttonFormatter : this.opt.actionsFormatter}
                >
                    Akce
                </TableHeaderColumn>
            );
        }
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">

                        {this.state.globalerr && <div className="card card-inverse card-danger">
                            <div className="card-header"><strong>{this.state.globalerr}</strong></div>
                        </div>}
                        {!this.state.globalerr &&
                        <div className="card">
                            <BootstrapTable
                                cellEdit={this.cellEditProp}
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
                                trClassName={this.trClassFormat}
                                multiColumnSearch={true}
                                ignoreSinglePage
                                multiColumnSort={2}
                                exportCSV={true}
                            >
                                {cols}
                            </BootstrapTable>
                            {this.state.chyba && <span>{this.state.chyba}</span>}
                        </div>}
                    </div>
                </div>

            </div>
        )
    }
}

export default FilterTable;
