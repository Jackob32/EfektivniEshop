import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'react-select-plus/dist/react-select-plus.css';
import Select from '../../../components/Forms/Select/Select';
import TextArea from '../../../components/Forms/TextArea/TextArea';
import Input from '../../../components/Forms/Input/Input';
import {FormSection, reducer as formReducer, Field, reduxForm, initialize, stopSubmit, startSubmit} from 'redux-form'
import {SubmissionError} from 'redux-form';
import  MyFetch from '../../../functions';
import Address from '../../../components/Address/Address';

function IsNumeric(input) {
    return (input - 0) == input && ('' + input).trim().length > 0;
}

function validate(values) {
    const errors = {};
    if (!values.nameEshop) {
        errors.nameEshop = 'Nastavte název eshopu';
    }
    if (!values.phone || !IsNumeric(values.phone)) {
        errors.phone = 'Nastavte telefonní číslo.';
    }
    if (!values.mobilePhone || !IsNumeric(values.mobilePhone)) {
        errors.mobilePhone = 'Nastavte mobilní číslo.';
    }
    return errors;
}

function warn(values) {
    const warnings = {};

    if (!values.bankCode || !IsNumeric(values.bankCode)) {
        warnings.bankCode = 'Je tohle opravdu kod baky?';
    }

    return warnings;
};
class BasicForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backspaceRemoves: true,
            multi: true,
            redirectToNewPage: false,
            update: props.update,
            headline: props.headline,
            id: props.id,
            connected: true
        };
        this.handleInitialize = this.handleInitialize.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.handleInitialize();
    }

    submit(values) {
        startSubmit("InfoForm");
        let options = {
            method: 'PUT',
            body: JSON.stringify(values)
        };
        return MyFetch('/api/settings/info', options).then(data => {
           stopSubmit("InfoForm");
        }).catch(error => {
            throw new SubmissionError({
                _error: 'Chyba při vkládání',
            });
        });
    }

    handleInitialize() {
        MyFetch('/api/settings/info').then(data => {
            this.props.initialize(data);
            this.setState({connected: true});
        }).catch(error => {
            this.setState({connected: false});
        });
    }

    render() {
        const {dirty,submitFailed,submitSucceeded, handleSubmit, pristine, reset, submitting, error} = this.props;
        return (
            <div className="animated fadeIn">
                <form onSubmit={handleSubmit(this.submit)}>
                    <div className="col-sm-12 col-md-12 col-lg-12">

                        {!this.state.connected &&  <div className="card card-inverse card-danger">
                            <div className="card-header"><strong>Chyba připojení k serveru</strong></div>
                       </div>}

                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <strong>Základní informace</strong>
                                    </div>
                                    <div className="card-block">
                                        <Field name="nameEshop" type="text" label="Název Eshopu" component={Input}/>

                                        <Field name="mobilePhone" type="text" label="Mobilní Telefon"
                                               component={Input}/>
                                        <Field name="phone" type="text" label="Telefon" component={Input}/>
                                        <Field name="description" type="text" label="Info Kreditní karty"
                                               component={TextArea}/>
                                    </div>
                                </div>

                                <div className="card">
                                        <div className="card-header">
                                            <strong>Platební informace</strong>
                                        </div>
                                    <div className="card-block">
                                        <Field name="bankCode" type="text" label="Kod banky" component={Input}/>
                                        <Field name="creditCardInfo" type="text" label="Kreditni karta"
                                               component={Input}/>
                                    </div>
                                </div>
                            </div>
                            <FormSection name="address">
                                <Address name="Adresa Eshopu" onstart="open"/>
                            </FormSection>

                            <div>
                                {error && <div className="row"><strong>{error}</strong></div>}
                                <div className="card-footer">
                                    {!submitFailed &&  <button className="btn btn-sm btn-primary" type="submit"
                                            disabled={pristine || submitting}>
                                        {submitSucceeded && <i className="fa fa-check"></i>}
                                        Odeslat
                                    </button>}
                                    {submitFailed &&   <button className="btn btn-sm btn-warning" type="submit"
                                            disabled={pristine || submitting}>
                                     <i className="fa fa-warning"></i>
                                        Odeslat
                                    </button>}
                                    <button className="btn btn-sm btn-danger" type="button"
                                            disabled={pristine || submitting} onClick={reset}>
                                        Reset
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const Reform = reduxForm({
    form: 'InfoForm',
    validate,
    warn,
})


// You have to connect() to any reducers that you wish to connect to yourself
export default connect(
    state => ({
        initialValues: state.info.data, // pull initial values from account reducer
    }),
)(Reform(BasicForm));