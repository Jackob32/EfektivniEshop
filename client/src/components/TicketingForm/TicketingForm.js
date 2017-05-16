import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { reducer as formReducer } from 'redux-form'
import { connect } from 'react-redux';
import * as actions from '../../actions/FormSubmit';



/*
var newState = myArray.slice(0); //naklonujeme pole
newState.push(action.text); //přidáme prvek
return newState; //nové pole vrátíme
*/
//je jako
// return [...state, action.text]

class TicketingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
      const { handleSubmit } = this.props;
    return (

        <div>
        <div className="row">
          <div className="col-lg-12">

          </div>
          </div>
        </div>

    )
  }
}

export default TicketingForm;

//export default  connect(mapStateToProps, actions)(form(TicketingForm));

