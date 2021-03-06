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

    }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
//<TicketingForm />
//<ExampleForm submitFormAction=""/>

    render() {

      let STATES = [
   //     {field: '_id', hidden: true, key: true, sort: true, label: 'Product ID'},
          {field: 'name', hidden: false, key: true, sort: true, label: 'Název stavu'}

];
        let Options = {
            modalNew: 'Nový stav objednávky',
            add: true,
            delete: true,
            key: true,
            sort: true,
            label: 'Stav Objednávky'
        };

    return (
      <div className="animated fadeIn">
        <FilterTable dataModel={STATES} insert={true} options={Options} fetchUrl="/api/states/" submitFormAction={this.handleForm}/>
      </div>
    )
  }
}

export default Transports;
