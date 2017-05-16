import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'react-select-plus/dist/react-select-plus.css';
import Select from '../../../components/Forms/Select/Select';
import TextArea from '../../../components/Forms/TextArea/TextArea';
import Input from '../../../components/Forms/Input/Input';
import {reducer as formReducer, Field, reduxForm, initialize, stopSubmit, startSubmit} from 'redux-form'
import { SubmissionError } from 'redux-form';
import  MyFetch from '../../../functions';

function validate(values) {
    const errors = {};
 /*   if (!values.name) {
        errors.name = 'Nastavte název produktu';
    }
    if (!values.price) {
        errors.price = 'Nebyla zvolena cena';
    }
    if (!values.count) {
        errors.count = 'Nebyl nastaven počet produktů na skladě';
    }
    if (values.count < 0) {
        errors.count = 'Nelze zvolit záporný počet produktů';
    }
    if (!values.properties) {
        errors.properties = 'Přidejte k produktu vlastnosti'
    }*/
    return errors;
}

function warn(values) {
    const warnings = {};
  /*  if (!values.description) {
        warnings.description = 'Opravdu chcete nechat popis produktu nevyplněné?';
    } else {
        if (values.description.length < 5) {
            warnings.description = 'Opravdu chcete nechat popis produktu nevyplněné?';
        }
    }
    if (!values.min_description) {
        warnings.min_description = 'Opravdu chcete nechat krátký popis produktu nevyplněné?';
    } else {
        if (values.min_description.length < 10) {
            warnings.min_description = 'Opravdu chcete nechat krátký popis produktu nevyplněné?';
        }
    }
    if (!values.code) {
        warnings.code = 'Nezapoměli jste vyplnit kód produktu?';
    } else {
        if (values.code.length < 10) {
            warnings.code = 'Opravdu je tohle správný kód produktu?';
        }
    }
    if (!values.picture) {
        warnings.picture = 'Nebyl vybran obrazek';
    }
    if (values.count === 0) {
        warnings.count = 'Opravdu je na skladě 0 produktů?';
    }
    if (values.price < 40) {
        warnings.price = 'Opravdu chcete prodávat produkt takto levně?';
    }
    if (!values.category) {
        warnings.category = 'Opravdu chcete mít produkt bez kategorie?'
    }*/
    return warnings;
};

const loadForm = data => ({type: 'LOAD', data});

class BasicForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backspaceRemoves: true,
            multi: true,
            redirectToNewPage: false,
            update: props.update,
            headline: props.headline,
            id: props.id
        };
        this.handleInitialize = this.handleInitialize.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
            this.handleInitialize();
    }

    submit(values) {
        values.nameOwner={
            first:values.first,
            last:values.last
        };
        startSubmit("InfoForm");
        let options = {
            method: 'PUT',
 body: JSON.stringify(values)
        };
       return MyFetch('/api/settings/info',options).
        then(data => {
         //   stopSubmit("InfoForm");
            console.log(data);
        }).catch(error => {
            console.error(error.msg);
 throw new SubmissionError({
                name: 'Není již produkt s tímto názvem vložen?',
                _error: 'Chyba při vkládání',
            });
        });
}

    handleInitialize() {
        MyFetch('/api/settings/info').
        then(data => {
            data.last=data.nameOwner.last;
            data.first=data.nameOwner.first;
            this.props.load(data);
        }).catch(error => {
            console.error(error.msg);
            throw new SubmissionError({
                name: 'Není již produkt s tímto názvem vložen?',
                _error: 'Chyba při vkládání',
            });
        });
    }

  render() {
      const {submitSucceeded, handleSubmit, pristine, reset, submitting, error} = this.props;
    return (
      <div className="animated fadeIn">
        <div className="row">

          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <strong>{this.state.headline}</strong>
              </div>
              <div className="card-block">
                <form className="form-2orizontal" onSubmit={handleSubmit(this.submit)}>
                  <Field name="nameEshop" type="text" label="Název Eshopu" component={Input}/>
                  <Field name="first" type="text" label="Jméno" component={Input}/>
                  <Field name="last" type="text" label="Příjmení" component={Input}/>

                  <Field name="phone" type="text" label="Telefon" component={Input}/>
                  <Field name="mobilePhone" type="text" label="Mobilní Telefon" component={Input}/>

                  <Field name="description" type="text" label="Info Kreditní karty" component={TextArea}/>
                    <Field name="creditCardInfo" type="text" label="Mobilní Telefon" component={Input}/>

                  <Field name="bankAccount" type="text" label="Číslo Účtu" component={Input}/>

                    {error && <strong>{error}</strong>}
                    {submitSucceeded && <strong>Aktualizovano</strong>}
                  <div>
                    <div className="card-footer">
                      <button className="btn btn-sm btn-primary" type="submit"
                              disabled={pristine || submitting}>
                        Odeslat
                      </button>
                      <button className="btn btn-sm btn-danger" type="button"
                              disabled={pristine || submitting} onClick={reset}>
                        Reset
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const Reform = reduxForm({
    form: 'InfoForm',
    validate,
    warn,
    //  asyncValidate,
    // asyncBlurFields: ['name'],
    //   ,initialValues
    fields: ['nameEshop', 'first', 'last', 'users', 'phone', 'mobilePhone', 'description', 'bankAccount', 'creditCardInfo'],
    //touchOnChange
})

var mapStateToProps = state => state;
// You have to connect() to any reducers that you wish to connect to yourself
export default connect(
    state => ({
        initialValues: state.account.data, // pull initial values from account reducer
    }),
    {load: loadForm}, // bind account loading action creator
)(Reform(BasicForm));