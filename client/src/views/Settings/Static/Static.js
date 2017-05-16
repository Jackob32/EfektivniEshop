import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'react-select-plus/dist/react-select-plus.css';
import Input from '../../../components/Forms/Input/Input';
import {formValueSelector, Field, reduxForm, stopSubmit, startSubmit} from 'redux-form'
import {SubmissionError} from 'redux-form';
import  MyFetch from '../../../functions';

import Editor from '../../../components/Forms/Editor/Editor';

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
        values.nameOwner = {
            first: values.first,
            last: values.last
        };
        startSubmit("DesignStaticForm");
        let options = {
            method: 'PUT',
            body: JSON.stringify(values)
        };
        MyFetch('/api/settings/static', options).then(data => {
            stopSubmit("DesignStaticForm");
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
        MyFetch('/api/settings/static').then(data => {
            this.props.initialize(data);
        }).catch(error => {
            console.error(error.msg);
            throw new SubmissionError({
                name: 'Není již produkt s tímto názvem vložen?',
                _error: 'Chyba při vkládání',
            });
        });
    }


    /*

     editorState={editorState}
     toolbarClassName="home-toolbar"
     wrapperClassName="home-wrapper"
     editorClassName="home-editor"
     onEditorStateChange={this.onEditorStateChange}
     uploadCallback={uploadImageCallBack}
     */
    render() {
        const {lol, about, submitSucceeded, handleSubmit,} = this.props;
        return (
            <div className="animated fadeIn">
                <form onSubmit={handleSubmit(this.submit)}>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="row">

                            <div className="col-sm-12 col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <strong>O nás</strong>
                                    </div>
                                    <div className="card-block">

                                        <Field name="about" type="text" component={Editor}  />

                                    </div>
                                </div>
                            </div>

                            <Field name="lol" type="text" component={Input}  />


                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <div className="card">
                                        <div className="card-block">{about}
                                    </div>
                                    </div>
                                </div>  </div>


                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <div className="card">
                                        <div className="card-block">{lol}
                                        </div>
                                    </div>
                                </div>  </div>
                            <div>
                                <div className="card-footer">
                                    <button className="btn btn-sm btn-primary" type="submit"
                                       >
                                        Odeslat
                                    </button>
                                    <button className="btn btn-sm btn-danger" type="button"
                                          >
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
const selector = formValueSelector('DesignStaticForm'); // <-- same as form name

const Reform = reduxForm({
    form: 'DesignStaticForm',
    validate,
    warn,
})

export default connect(
    state => ({
        about:selector(state, 'about'),
        lol:selector(state, 'lol'),

    }),
)(Reform(BasicForm));