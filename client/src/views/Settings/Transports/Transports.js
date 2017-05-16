import React, { Component } from 'react';
import FilterTable  from './../../../components/FilterTable/FilterTable'
import { Link } from 'react-router'

class Transports extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
      this.handleForm = this.handleForm.bind(this);
  }
    handleForm(FormData){

    console.log(FormData);

    }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
//<TicketingForm />
//<ExampleForm submitFormAction=""/>

/*
    const jobTypes = [ 'A', 'B', 'C', 'D' ];

    class DataInsertTypeTable extends React.Component {
    render() {
        return (
            <BootstrapTable data={ jobs } insertRow={ true }>
                <TableHeaderColumn dataField='id' isKey={ true }>Job ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name' editable={ { type: 'textarea' } }>Job Name</TableHeaderColumn>
                <TableHeaderColumn dataField='type' editable={ { type: 'select', options: { values: jobTypes } } }>Job Type</TableHeaderColumn>
                <TableHeaderColumn dataField='active' editable={ { type: 'checkbox', options: { values: 'Y:N' } } }>Active</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}*/


    render() {


        function numberValidate(value, row) {
            if (isNaN(parseInt(value, 10))) {
                return 'Cena musí být číslo!';
            }
            if (value<0) {
                return 'Cena musí být kladná!';
            }
            return true;
        }


      let TRANSPORTS = [
   //     {field: '_id', hidden: true, key: true, sort: true, label: 'Product ID'},
        {field: 'name', hidden: false, key: true, sort: true, label: 'Název'},
    {field: 'description', hidden: false, key: false, sort: true, label: 'Popis', editable: true },
          {field: 'deliverytime', hidden: false, key: false, sort: true, label: 'Čas doručení', editable: true},
        {field: 'price',editable:{ validator: numberValidate }  , hidden: false, key: false, sort: true, label: 'Cena'
        }
];
        let options =  {modalNew: 'Nový dopravce', delete: true, key: true, sort: true, label: 'Product ID'};

    return (
      <div className="animated fadeIn">
        <FilterTable dataModel={TRANSPORTS} insert={true} options={options} fetchUrl="/api/transports/" submitFormAction={this.handleForm}/>
      </div>
    )
  }
}

export default Transports;
