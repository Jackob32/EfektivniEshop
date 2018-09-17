import React, {Component} from 'react';
import 'react-select-plus/dist/react-select-plus.css';
import {Redirect} from 'react-router';
import {startSubmit, stopSubmit, SubmissionError} from 'redux-form'
import MyFetch from '../../functions';

class ChangeForm extends Component {
    constructor(props) {
        super(props);
        this.redirect = (this.props.redirect === 'undefined') ? false : true;
        let headline = this.props.updateheadline;
        if (this.props.id == null)
            headline = this.props.newheadline;
        this.state = {
            backspaceRemoves: true,
            multi: true,
            redirectToNewPage: false,
            headline: headline,
            globalerr: null
        };
        this.handleInitialize = this.handleInitialize.bind(this);
        this.submit = this.submit.bind(this);
        if (this.props.submitModifier)
            this.submitModifier = this.props.submitModifier.bind(this);
        else
            this.submitModifier = this.submitModifier.bind(this)
    }

    submitModifier(values) {
        return values;
    }

    componentWillMount() {
        if (this.props.id != null)
            this.handleInitialize();
    }

    submit(values) {
        values = this.submitModifier(values);
        startSubmit(this.props.formname);
        let url = this.props.url;
        let method = 'POST';
        if (values._id && values._id !== null) {
            url = this.props.url + "/" + values._id;
            method = 'PUT';
        }
        let options = {
            method: method,
            body: JSON.stringify(values)
        };
        return MyFetch(url, options).then(data => {
            stopSubmit(this.props.formname);
            this.setState({redirectToNewPage: true});

        }).catch(error => {

            if (error.ok == false && error.status == 500) {
                this.setState({globalerr: "Chyba připojení k serveru"});
            }

            stopSubmit(this.props.formname);
            if (error.code == 11000) {
                error.name = "Položka s tímto názvem již existuje";
                error.email = "Uživatel s tímto emailem již existuje";

                error.code = null;
                if (this.props.url == "/api/orders") {
                    error.code = "Objednávka s tímto kódem již existuje";
                }
            }
            if (error.msg) {
                error._error = error.msg;
            }
            throw new SubmissionError({
                ...error,
                ...error.errors
            });
        });
    }


    handleInitialize() {
        let url = this.props.url + "/" + this.props.id;
        MyFetch(url)
            .then(data => {
                if (!data) {
                    this.setState({globalerr: "Upravovaný objekt neexistuje"});
                }
                if (data.pairprop) {
                    data.pairprop.forEach(function (pair, index, arr) {
                        if (pair)
                            data.pairprop[index] = {value: pair.value, ...pair._id};
                    });
                }
                this.props.initialize(data);
                console.log(data);
            }).catch(error => {
            if (error.ok == false && error.status == 500) {
                this.setState({globalerr: "Chyba připojení k serveru"});
            }
            console.log(error);
            console.error(error.msg);
            throw new SubmissionError({
                _error: error.msg
            });
        });
    }

    render() {

        const {submitSucceeded, handleSubmit, pristine, reset, submitting, error, submitFailed} = this.props;

        return (
            <div className="animated fadeIn">

                {this.state.redirectToNewPage && <Redirect to={this.props.redirect}/>}

                <h2 className="d-print-none">{this.state.headline}</h2>

                <div className="col-sm-12 col-md-12">

                    {this.state.globalerr && <div className="card card-inverse card-danger">
                        <div className="card-header"><strong>{this.state.globalerr}</strong></div>
                    </div>}
                    <div className="card card-accent-primary">

                        <div className="card-block">

                            <form className="form-2orizontal" onSubmit={handleSubmit(this.submit)}>
                                {this.props.children}

                                {error && <strong>{error}</strong>}

                                <br/>

                                <div>
                                    {error && <div className="row"><strong>{error}</strong></div>}
                                    <div className="card-footer">
                                        {!submitFailed && <button className="btn btn-sm btn-primary" type="submit"
                                                                  disabled={pristine || submitting}>
                                            {submitSucceeded && <i className="fa fa-check"></i>}
                                            Odeslat
                                        </button>}
                                        {submitFailed && <button className="btn btn-sm btn-warning" type="submit"
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


                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ChangeForm;
