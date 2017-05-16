import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'react-select-plus/dist/react-select-plus.css';
import Select from '../../../components/Forms/Select/Select';
import TextArea from '../../../components/Forms/TextArea/TextArea';
import Input from '../../../components/Forms/Input/Input';
import NewProps from '../../../components/Forms/Props/NewProps';
import OldProps from '../../../components/Forms/Props/OldProps';
import { browserHistory } from 'react-router';
import {reducer as formReducer, SubmissionError,formValueSelector,Field, reduxForm, initialize, touched,stopSubmit, startSubmit,FieldArray} from 'redux-form'
import  MyFetch from '../../../functions';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Categories from './../../../components/Categories/Categories'

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

class MyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            primary: false,
        };
        this.togglePrimary= this.togglePrimary.bind(this);
    }
    toggle() {
        this.setState({

            modal: !this.state.modal
        });
    }

    togglePrimary(e) {
        e.preventDefault();
        this.setState({
            primary: !this.state.primary
        });
    }
    render() {
        return (
  <div>
      <button className="btn btn-primary btn-md btn-block" onClick={this.togglePrimary}>
          Upravit {this.props.name}</button>

           <Modal isOpen={this.state.primary} toggle={this.togglePrimary} className={'modal-lg modal-primary ' + this.props.className}>
                   <ModalHeader toggle={this.togglePrimary}>{this.props.headline}</ModalHeader>
                           <ModalBody>
                               {this.props.children}
                           </ModalBody>
                   <ModalFooter>
                       {this.props.submit!="" &&  <a className="btn btn-primary"  color="primary" onClick={this.togglePrimary}>{this.props.submit}</a> }{' '}
                       {this.props.cancel!="" && <a className="btn btn-secondary"  color="secondary" onClick={this.togglePrimary}>{this.props.cancel}</a>}
            </ModalFooter>
             </Modal>
</div>
        )
    }
}

function validate(values) {
    const errors = {};
    if (!values.name) {
        errors.name = 'Nastavte název produktu';
    }
    if (!values.price) {
        errors.price = 'Nebyla zvolena cena';
    }
    if (values.count < 0) {
        errors.count = 'Nelze zvolit záporný počet produktů!';
    }

    if (!values.count) {
        errors.count = 'Zvolte počet produktů!';
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
            warnings.description = 'Opravdu chcete nechat popis produktu takto krátký?';
        }
    }
    if (!values.min_description) {
        warnings.min_description = 'Opravdu chcete nechat krátký popis produktu nevyplněné?';
    } else {
        if (values.min_description.length < 10) {
            warnings.min_description = 'Opravdu chcete nechat krátký popis produktu takto krátký?';
        }
    }
    if (!values.code) {
        warnings.code = 'Nezapoměli jste vyplnit kód produktu?';
    } else {
        if (values.code.length < 10) {
            warnings.code = 'Opravdu je tohle správný kód produktu?';
        }
    }
   /* if (!values.picture) {
        warnings.picture = 'Nebyl vybran obrazek';
    }*/
    if (values.count === 0) {
        warnings.count = 'Opravdu je na skladě 0 produktů?';
    }
    if (values.price < 50) {
        warnings.price = 'Opravdu chcete prodávat produkt takto levně?';
    }
    if (!values.category) {
        warnings.category = 'Opravdu chcete mít produkt bez kategorie?'
    }
    if (!values.visible) {
        warnings.visible = 'Produkt nebude zveřejněn'
    }
    return warnings;
};

/*
 <input type="file" required accept="image/*" id="fieldPhoto" name="photo" />
 */

/*
 let newState = myArray.slice(0); //naklonujeme pole
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
      return MyFetch(url,options).
        then(data => {
            stopSubmit("NewProduct");
            browserHistory.push('/products/');
          console.log("jooo");
            console.log(data);
        }).catch(error => {



         console.log(error);

            stopSubmit("NewProduct");

            if(error.code==11000){
                error.name="Není již produkt s tímto názvem vložen?";
                error.code=null;
            }
          error._error=error.msg;


            throw new SubmissionError({
                ...error,
                ...error.errors
            });
        });
    }
    handleInitialize() {
        let url = '/api/products/' + this.state.id;

        MyFetch(url)
            .then(data => {
                console.log("loooading ");
                console.log(data);
                if(data.pairprop){
                data.pairprop.forEach(function(pair, index, arr) {
                    if(pair)
                    data.pairprop[index]={value: pair.value, ...pair._id};
                });}
                this.props.initialize(data);
            }).catch(error => {
            console.error(error.msg);
            throw new SubmissionError({
                name: 'Není již produkt s tímto názvem vložen?',
                _error: error.msg
            });
            });

    }

        render() {
            const {OldPropsValues,values,fields,submitSucceeded, handleSubmit, pristine, reset, submitting, error, submitFailed } = this.props;

            //       console.log(OldPropsValues);

            return (
                <div className="animated fadeIn">

                    <h2>{this.state.headline}</h2>

                    <div className="col-sm-12 col-md-12">
                        <div className="card card-accent-primary">

                            <div className="card-block">

                                    <form className="form-2orizontal" onSubmit={this.props.handleSubmit(this.submit)}>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card">
                                                    <div className="card-header">
                                                        Hlavní
                                                    </div>
                                                    <div className="card-block">

                                                        <Field name="name" type="text" label="Název" component={Input}/>

                                                        <Field name="min_description" type="text" component={TextArea}
                                                               label="Krátký popis"/>

                                                        <Field name="description" type="text" component={TextArea} label="Popis"/>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card">
                                                    <div className="card-header">
                                                        Ceny a detaily
                                                    </div>
                                                    <div className="card-block">
                                                        <div className="row">
                                                        <div className="col-md-6">
                                                            <Field name="code" type="text" component={Input} label="Kód"/>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Field name="count" type="number" component={Input} label="Počet na skladě"/>
                                                        </div>
                                                        </div>
                                                        <div className="row">
                                                        <div className="col-md-6">
                                                            <Field name="price" type="number" component={Input} label="Cena"/>
                                                        </div>
                                                            <div className="col-md-6">
                                                                <Field name="visible" value="visible" type="checkbox" component={Input} label="Zveřejnit"/>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <Field name="category" type="text" component={Select} url="/api/categories"
                                                                       dataform={{valueKey: "_id", labelKey: "title"}}
                                                                       label="Kategorie" />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <MyModal submit="" cancel="Zavřít" name="Kategorie"  headline="Kategorie">
                                                                    <Categories />
                                                                </MyModal>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                        <Field name="related" type="text" component={Select} url="/api/products"
                                                               dataform={{valueKey: "_id", labelKey: "name"}}
                                                               label="Podobné"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                          </div>

                                        <FieldArray OldPropsValues={OldPropsValues} name="pairprop" component={OldProps} />

                                        <FieldArray name="NewProps" component={NewProps} />

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

            )
        }
}


const Reform = reduxForm({
    form: 'NewProductForm',
    validate,
    warn,
    fields: ['name', 'min_description', 'description', 'code', 'count', 'price', 'category', 'related', 'pairprop', 'pairprop'],
})

const selector = formValueSelector('NewProductForm'); // <-- same as form name

export default connect(
    state => ({
        OldPropsValues: selector(state, 'OldPropsSelect'),
    }),
)(Reform(NewProduct));
