import React, { Component } from 'react';
import FilterTable  from './../../../components/FilterTable/FilterTable'
import { Link } from 'react-router'

class Props extends Component {

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
        const types = [ 'text', 'checkbox', 'color','date', 'number' ];

      let PROPS = [
   //     {field: '_id', hidden: true, key: true, sort: true, label: 'Product ID'},
        {field: 'name', hidden: false, key: true, sort: true, label: 'Název'},
        {field: 'type', hidden: false, key: false, sort: true, label: 'Typ', editable: { type: 'select', options: { values: types }}},
        {field: 'help', hidden: false, key: false, sort: true, label: 'Nápověda' ,editable: true},
          {field: 'measurement', hidden: false, key: false, sort: true, label: 'Jednotka', editable: true},

      ];
        let Options =  {modalNew: 'Nový parametr', delete: true, key: true, sort: true, label: 'Paraetr ID'};

    return (
      <div className="animated fadeIn">
        <FilterTable dataModel={PROPS} insert={true} options={Options} fetchUrl="/api/props/" submitFormAction={this.handleForm}/>
      </div>
    )
  }
}

export default Props;
