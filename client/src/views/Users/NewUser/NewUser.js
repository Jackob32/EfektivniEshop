import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'react-select-plus/dist/react-select-plus.css';
import Select from '../../../components/Forms/Select/Select';

import Input from '../../../components/Forms/Input/Input';
import ChangeForm from '../../../components/ChangeForm/';
import Address from '../../../components/Address/Address';

import {Field, FormSection, reduxForm, touched} from 'redux-form'

let validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
function validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = 'Email uživatele musí být vyplněn.';
    }else if(!validateEmail(values.email)){
        errors.email = 'Email uživatele není ve formátu xxx@xxx.xx';
    }
    if (!values.address) {
        errors.address={};
        errors.address.firstname = 'Vyplňte jméno';
        errors.address.lastname = 'Vyplňte příjmení';
    }else {
        errors.address={};
        if (!values.address.lastname) {
            errors.address.lastname = 'Vyplňte příjmení';
        }

        if (!values.address.firstname) {
            errors.address.firstname = 'Vyplňte jméno';
        }
    }
    return errors;
}
function warn(values) {
    const warnings = {};

    if (!values.password) {
        warnings.password = 'Opravdu chcete nechat heslo prázdné?';
    }
    if (values.address) {
       warnings.address={};
        if (!values.address.phone) {
            warnings.address.phone = 'Opravdu chcete nechat telefon nevyplněný?';
        }
        if (values.address.company) {

            if (!values.address.ic && !values.address.ico && !values.address.dic ) {
                warnings.address.ico=' ';
                warnings.address.ic=' ';
                warnings.address.dic=' ';
            }
        }
    }
    return warnings;
}


class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backspaceRemoves: true,
            multi: true,
            redirectToNewPage: false,
            id: this.props.match.params.id
        };
        this.submitModifier = this.submitModifier.bind(this)
    }

    submitModifier(values) {
        return values;
    }
    render() {
        return (
            <ChangeForm submitModifier={this.submitModifier}  {...this.props} redirect="/users/"
                        id={this.props.match.params.id} updateheadline="Upravit Uživatele"
                        newheadline="Nový Uživatel" url="/api/users" formname="NewUserForm">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                Nastavení
                            </div>

                            <div className="card-block">
                                <div className="row">
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <Field name="email" type="text" label="Email" component={Input}/>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <Field name="password" type="password" label="Heslo" component={Input}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <Field name="role" type="text" label="Role" component={Select} defaultvalue="customer" multi={false} internaly={true} options={[

                                                        { value: 'customer', label: 'Zákazník' },
                                                        { value: 'carrier', label: 'Dopravce' },
                                                        { value: 'admin', label: 'Administrátor' },
                                                        { value: 'seller', label: 'Prodavač' }

                                            ]}/>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <Field name="newsletter" type="checkbox" label="Newsletter"
                                                   component={Input}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FormSection name="address">
                            <Address name="Adresa" editable={true} onstart="open"/>
                        </FormSection>

                    </div>
                         <div className="row">   <div className="col-sm-12 col-md-12 col-lg-12">
                        <Field name="basket" type="text" component={Select} url="/api/products"
                                                dataform={{valueKey: "_id", labelKey: "name"}}
                                                label="Košík"/>
                    </div>    </div>
            </ChangeForm>
    )
    }
    }

    const Reform = reduxForm({
        form: 'NewUserForm',
        validate,
        warn,
    });

    export default connect(
    )(Reform(NewUser));
