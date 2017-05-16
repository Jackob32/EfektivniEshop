import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { reducer as formReducer } from 'redux-form'
import { connect } from 'react-redux';
import * as actions from '../../actions/FormSubmit';

var sgTeams = [
    {id: 561456, img: "Akademiks Rays Alight" ,name: "Akademiks Rays Alight", price: "Oneil", visible: true, category: "shoes", fce: <button>popup</button>},
    {id: 56161, img: "Akademiks Rays Alight" ,name: "Maui Jim Ho'okipa Tennessee", price: "Kawalsky", visible: false, category: "t-shird", fce: <button>aha</button>},
];

let fields = [
    { name: 'img', displayName: "Obrázek"},
    { name: 'name', displayName: "Název", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'price', displayName: "Cena", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'visible', displayName: "Viditelnost", exactFilterable: true, sortable: true },
    { name: 'category', displayName: "Kategorie", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'fce', displayName: "Akce", inputFilterable: true, sortable: true }
];


/*
var newState = myArray.slice(0); //naklonujeme pole
newState.push(action.text); //přidáme prvek
return newState; //nové pole vrátíme
*/
//je jako
// return [...state, action.text]

function validate(formProps) {
    const errors = {};

    if (!formProps.firstName) {
        errors.firstName = 'Please enter a first name';
    }

    if (!formProps.lastName) {
        errors.lastName = 'Please enter a last name';
    }

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.phoneNumber) {
        errors.phoneNumber = 'Please enter a phone number'
    }

    if(!formProps.sex) {
        errors.sex = 'You must enter your sex!'
    }

    return errors;
}

function mapStateToProps(state) {
    return {
     //   user: state.user
    };
}

const form = reduxForm({
    form: 'ExampleForm',
    validate
});

const renderField = field => (
    <div>
        <label>{field.input.label}</label>
        <input {...field.input}/>
        {field.touched && field.error && <div className="error">{field.error}</div>}
            </div>
            );

const renderSelect = field => (
    <div>
        <label>{field.input.label}</label>
        <select {...field.input}/>
        {field.touched && field.error && <div className="error">{field.error}</div>}
            </div>
            );

class ExampleForm extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
    handleFormSubmit(formProps) {
        this.props.submitFormAction(formProps);
    }
    componentDidMount() {
        this.handleInitialize();
    }

    handleInitialize() {
        const initData = {
            "firstName": this.props.currentUser.firstName,
            "lastName": this.props.currentUser.lastName,
            "sex": this.props.currentUser.sex,
            "email": this.props.userEmail,
            "phoneNumber": this.props.currentUser.phoneNumber
        };

        this.props.initialize(initData);
    }
  render() {
      const { handleSubmit } = this.props;
    return (

        <div>
        <div className="row">
          <div className="col-lg-12">

              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

                  <Field name="firstName" type="text" component={renderField} label="First Name"/>
                  <Field name="lastName" type="text" component={renderField} label="Last Name"/>
                  <Field name="sex" component={renderSelect} label="Gender">
                      <option></option>
                      <option name="male">Male</option>
                      <option name="female">Female</option>
                  </Field>
                  <Field name="email" type="email" component={renderField} label="Email" />
                  <Field name="phoneNumber" type="tel" component={renderField} label="Phone Number"/>

                  <button action="submit">Save changes</button>
              </form>
          </div>
          </div>
        </div>

    )
  }
}

export default connect(mapStateToProps, actions)(form(ExampleForm));

