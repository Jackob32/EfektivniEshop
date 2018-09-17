import React, {Component} from 'react';
import FilterTable from './../../../components/FilterTable/FilterTable'
import {Link} from 'react-router'

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

    render() {

      let PAYMENTS = [
   //     {field: '_id', hidden: true, key: true, sort: true, label: 'Product ID'},
        {field: 'name', hidden: false, key: true, sort: true, label: 'Název'},
    {field: 'description', hidden: false, key: false, sort: true, label: 'Popis', editable: true },

];
        let Options =  {modalNew: 'Nový typ platby', add:true, delete: true, key: true, sort: true, label: 'Typ Platby'};

    return (
      <div className="animated fadeIn">
        <FilterTable dataModel={PAYMENTS} insert={true} options={Options} fetchUrl="/api/payments/" submitFormAction={this.handleForm}/>
      </div>
    )
  }
}

export default Transports;
