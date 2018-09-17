import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'react-select-plus/dist/react-select-plus.css';
import Select from '../../../components/Forms/Select/Select';
import TextArea from '../../../components/Forms/TextArea/TextArea';
import Input from '../../../components/Forms/Input/Input';
import ChangeForm from '../../../components/ChangeForm/';
import NewProps from '../../../components/Forms/Props/NewProps';
import OldProps from '../../../components/Forms/Props/OldProps';

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Categories from './../../../components/Categories/Categories'


import {Field, FieldArray, formValueSelector, reduxForm} from 'redux-form'

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

        if (!values.NewProps || !values.NewProps.length) {

        } else {
            const NewPropsArrayErrors = [];
            values.NewProps.forEach((prop, propIndex) => {
                const memberErrors = {};
                if (!prop || !prop.name  ) {
                    memberErrors.name = 'Vyplňte název nového parametru';
                }
                if (!prop || !prop.value ) {
                    memberErrors.value = 'Vyplňte hodnotu parametru';
                }
                if (!prop || !prop.type ) {
                    memberErrors.type = 'Vyplňte typ parametru';
                }
                NewPropsArrayErrors[propIndex] = memberErrors;
            });
            if (NewPropsArrayErrors.length) {
                errors.NewProps = NewPropsArrayErrors;
            }
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
}

class NewProduct extends Component {

    constructor(props) {
        super(props);
        let headline = "Upravení produktu";
        if (this.props.match.params.id == null)
            headline = "Nový produkt";
        this.state = {
            backspaceRemoves: true,
            multi: true,
            redirectToNewPage: false,
            headline: headline,
            id: props.match.params.id
        };
    }


    render() {
        const {OldPropsValues} = this.props;


        return (
            <ChangeForm  {...this.props} redirect="/products/" id={this.props.match.params.id}
                         updateheadline="Upravení produktu"
                         newheadline="Nový produkt" url="/api/products" formname="NewOrderForm">
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

            </ChangeForm>
        )
    }
}


const Reform = reduxForm({
    form: 'NewProductForm',
    validate,
    warn
});

const selector = formValueSelector('NewProductForm'); // <-- same as form name

export default connect(
    state => ({
        OldPropsValues: selector(state, 'OldPropsSelect'),
    }),
)(Reform(NewProduct));
