import React, {Component} from 'react';
const {DOM: {input, select, textarea}} = React
import {reducer as formReducer, FieldArray, Field, reduxForm, initialize, stopSubmit, startSubmit} from 'redux-form'
import Select from '../Forms/Select/Select';
import TextArea from '../Forms/TextArea/TextArea';
import Input from '../Forms/Input/Input';
import Props from '../Forms/Props/NewProps';

import  MyFetch from '../../../functions';
import {SubmissionError} from 'redux-form';
import 'react-select-plus/dist/react-select-plus.css';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
/*
 <input type="file" required accept="image/*" id="fieldPhoto" name="photo" />
 */

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

const loadForm = data => ({type: 'LOAD', data});

/*
 <input type="file" required accept="image/*" id="fieldPhoto" name="photo" />
 */

/*
 var newState = myArray.slice(0); //naklonujeme pole
 newState.push(action.text); //přidáme prvek
 return newState; //nové pole vrátíme
 */
//je jako
// return [...state, action.text]

class NewProduct extends Component {
    constructor(props) {
        super(props);
        let headline = "Upravení produktu";
        if(this.props.params.id==null)
            headline = "Nový produkt";
        this.state = {
            backspaceRemoves: true,
            multi: true,
            redirectToNewPage: false,
            headline: headline,
            id: props.params.id
        };
        this.handleInitialize = this.handleInitialize.bind(this);
        this.submit = this.submit.bind(this);

    }

    componentDidMount() {
        if (this.state.id != null)
            this.handleInitialize();
    }

    submit(values) {
        startSubmit("NewProduct");

        let url = '/api/products';
        let method = 'POST';
        if(values._id && values._id!==null) {
            url = '/api/products/'+values._id;
            method =  'PUT';
        }
        let options = {
            method: method,
            body: JSON.stringify(values)
        };
        MyFetch(url,options).
        then(data => {
            stopSubmit("NewProduct");
            console.log(data);
        }).catch(error => {
            stopSubmit("NewProduct");
            console.error(error.msg);
            throw new SubmissionError({
                name: 'Není již produkt s tímto názvem vložen?',
                _error: error.msg
            });
        });
    }


    handleInitialize() {
        startSubmit("AddProduct");
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });

        var url = '/products/' + this.state.id;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log("loooading ");
                console.log(data);
                this.props.load(data);
            })
        /*.catch(err => {
         console.log(err);

         if(!err.errors._error){
         throw new SubmissionError({
         _error: 'Chyba připojení k serveru',
         });
         }else{
         throw new SubmissionError(err.errors);
         }
         stopSubmit("AddProduct");
         });*/

        /*
         const initData = {
         name: 'tjxtrjty',
         min_description: 'Dtjtyjtcjfgjfgjcgjvjhukbhoe',
         description: 'jjfgjjf g jyjj gyj ygj gyj gjf2',
         code: 'looooooooool',
         count: 8100,
         price: 99,
         bio: 'Born to write amazing Redux code.',
         };


         this.props.load(initData)*/
        //this.props.initialize(data);
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

                                    <Field name="name" type="text" label="Název" component={Input}/>
                                    <Field name="min_description" component={TextArea} label="Apex"/>
                                    <Field name="description" component={TextArea} label="Popis"/>
                                    <Field name="code" type="text" component={Input} label="Kód"/>
                                    <Field name="count" type="number" component={Input} label="Počet na skladě"/>
                                    <Field name="price" type="number" component={Input} label="Cena"/>

                                    <Field name="category" type="text" component={Select} url="/api/categories"
                                           dataform={{valueKey: "_id", labelKey: "name"}}
                                           label="Kategorie"/>



                                    <Field name="related" type="text" component={Select} url="/api/products"
                                           dataform={{valueKey: "_id", labelKey: "name"}}
                                           label="Podobné"/>

                                    <Field name="pairprop" type="text" component={Select} url="/api/props"
                                           dataform={{valueKey: "_id", labelKey: "name"}}
                                           label="Vlastnosti"/>
                                    <Field name="visibility" type="checkbox" component={Input} label="Zveřejnit"/>

                                    <FieldArray name="members" component={Props} />



                                    {error && <strong>{error}</strong>}
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
    form: 'AddProduct',
    validate,
    warn,
    //  asyncValidate,
    // asyncBlurFields: ['name'],
    //   ,initialValues
    fields: ['name', 'min_description', 'description', 'code', 'count', 'price', 'category', 'related', 'pairprop', 'pairprop'],
    //touchOnChange
})

var mapStateToProps = state => state;
// You have to connect() to any reducers that you wish to connect to yourself
export default connect(
    state => ({
        initialValues: state.account.data, // pull initial values from account reducer
    }),
    {load: loadForm}, // bind account loading action creator
)(Reform(AddProduct));
