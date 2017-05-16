import React, {Component} from 'react';
const {DOM: {input, select, textarea}} = React;
import {reducer as formReducer,Field, reduxForm, initialize,stopSubmit, startSubmit} from 'redux-form'
import Select from '../Forms/Select/Select';
import TextArea from '../Forms/TextArea/TextArea';
import Input from '../Forms/Input/Input';
import { SubmissionError } from 'redux-form';
import 'react-select-plus/dist/react-select-plus.css';
import {browserHistory } from 'react-router';
/*
 <input type="file" required accept="image/*" id="fieldPhoto" name="photo" />
 */

function submit(values) {
    startSubmit("AddProduct");
    var headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    var url = '/products';
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(values),
        headers: headers
    };
    return fetch(url, fetchData).then(res => {
        if(!res.ok){
            throw new SubmissionError({
                name: 'Není již produkt s tímto názvem vložen?',
                _error: 'Chyba při vkládání',
            });
        }
        else{
            browserHistory.push('/products/');
        }
        stopSubmit("AddProduct");
    }).catch(err => {
        console.log(err);

        if(!err.errors._error){
        throw new SubmissionError({
            _error: 'Chyba připojení k serveru',
        });
        }else{
         throw new SubmissionError(err.errors);
        }
         stopSubmit("AddProduct");
});
}
/*
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function asyncValidate (values){
    return sleep(1).then(() => { // simulate server latency
        if (['john', 'paul', 'george', 'ringo'].includes(values.name)) {
            throw { name: 'That username is taken' };
        }
    });
}
*/
function validate(values) {
    const errors = {};
    if (!values.name) {
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
    }
    return errors;
}

function warn(values) {
    const warnings = {};
    if (!values.description) {
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
    }
    return warnings;
};

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backspaceRemoves: true,
            multi: true,
            redirectToNewPage: false
        };
    }
    render() {
        const {submitSucceeded, handleSubmit, pristine, reset, submitting,error} = this.props;
        return (
            <div>
                 <form className="form-2orizontal" onSubmit={handleSubmit(submit)}>
                    <Field name="name" type="text" label="Název" component={Input}/>
                    <Field name="min_description" component={TextArea} label="Apex"/>
                    <Field name="description" component={TextArea} label="Popis"/>
                    <Field name="code" type="text" component={Input} label="Kód"/>
                    <Field name="count" type="number" component={Input} label="Počet na skladě"/>
                    <Field name="price" type="number" component={Input} label="Cena"/>

                    <Field name="category" type="text" component={Select} url="/categories"
                        dataform={{valueKey: "_id", labelKey:"name", recursive:true}}
                        label="Kategorie"/>

                    <Field name="related" type="text" component={Select}  url="/products"
                           dataform={{valueKey: "_id", labelKey:"name", recursive:false}}
                           label="Podobné"/>

                    <Field name="pairprop" type="text" component={Select} url="/props"
                           dataform={{valueKey: "_id", labelKey:"name", recursive:false}}
                           label="Vlastnosti"/>
                    <Field name="visibility" type="checkbox" component={Input} label="Zveřejnit"/>
                     {error && <strong>{error}</strong>}
                     <div>
                        <button className="btn btn-sm btn-primary" type="submit" disabled={pristine || submitting}>
                            Odeslat
                        </button>
                        <button className="btn btn-sm btn-danger" type="button"
                                disabled={pristine || submitting} onClick={reset}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'AddProduct',
    validate,
    warn,
  //  asyncValidate,
    asyncBlurFields: ['name'],
 //   ,initialValues
   //, fields: ['startDate', 'endDate', 'origin', 'destination', 'hotel', 'hasCar'],
    //touchOnChange
})(Form)
