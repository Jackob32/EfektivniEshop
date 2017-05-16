import React, {Component} from 'react';
import Select from './../../components/Forms/Select/Select';
import TextArea from './../../components/Forms/TextArea/TextArea';
import Input from './../../components/Forms/Input';

import {
    reducer as formReducer,
    Field,
    touched

} from 'redux-form'

class Address extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleShow = this.toggleShow.bind(this);

        let collapse = !(this.props.onstart == null || this.props.onstart == "" || this.props.onstart == 'open')
        if (this.props.onstart == "close") {
            collapse = true;
            this.props.onstart = "";
        }

        let editable=this.props.editable;

        let dorucovaci=(this.props.name=="Doručovací adresa");

        let name=this.props.name;
        if(this.props.name==null)
            name="Adresa";

        let simple=false;
        if(this.props.simple==true)
            simple=true;

        this.state = {
            collapse: collapse,
            show: (this.props.data!=null) || editable,
            name:name,
            onstart:this.props.onstart,
            dorucovaci:dorucovaci,
            simple:simple,
        };

    }
    toggle(event) {
        event.preventDefault();
        this.setState({ collapse: !this.state.collapse });
    }
    toggleShow(event) {
        event.preventDefault();
        this.setState({onstart:"", show: !this.state.show });
    }
    render() {

        let show="icon-arrow-down";
        if(this.state.collapse){
            show="icon-arrow-up";
        }
        if(this.state.simple){

          return  <div className="col-sm-6 col-md-6 col-lg-6">
            <div className="card">
              <div className="card-header">
                  {this.state.name}{" "}

              </div>

              <div className="card-block">

                <div className="card-block">
                <div className={this.state.collapse && 'hidden'}>
                  <div className="row">
                      <Field name="firstname" label="" show={this.state.show}  component={Input} type="text"/>
                    &nbsp;
                      <Field name="lastname" label="" show={this.state.show}  component={Input} type="text"/>
                  </div>

                  <div className="row">
                      <Field name="phone" label="" show={this.state.show}  component={Input} type="text"/> </div>
                  <div className="row"> <Field name="company" label="" show={this.state.show}  component={Input} type="text"/>
                    </div>
                  </div>

                  <div className="row">

                      <Field name="street" label="" show={this.state.show}  component={Input} type="text"/>

                    &nbsp;&nbsp;
                      <Field name="number" label="" show={this.state.show}  component={Input} type="number"/>

                  </div>

                  <div className="row">
                    <Field name="city" label="" show={this.state.show}  component={Input} type="text"/>
                    &nbsp;&nbsp;
                    <Field name="district" label="" show={this.state.show}  component={Input} type="text"/>



                  </div>
                  <div className="row">

                      <Field name="zip" label="" show={this.state.show}  component={Input} type="text"/>
                  </div>   <div className="row">


                      <Field name="country" label="" show={this.state.show}  component={Input} type="text"/>

                  </div>

                </div>

                </div>
              </div>    </div>



        }else{

        return  <div className="col-sm-12 col-md-12 col-lg-6">
          <div className="card">
            <div className="card-header">
                {this.state.name}{" "}
                {this.state.onstart}{" "}
                {this.state.dorucovaci &&  <Field name="same" label="Stejná Jako Fakturační" component="input" type="checkbox"/>}

              <div className="card-actions">

                <a href="#" className="btn-minimize" onClick={this.toggleShow}><i className="fa fa-edit fa-lg"></i></a>
                <a href="#" className="btn-minimize" onClick={this.toggle}><i className={show}></i></a>

              </div>
            </div>

            <div className="card-block">
              <div className={this.state.collapse && 'hidden'}>

                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <Field name="firstname" label="Jméno" show={this.state.show}  component={Input} type="text"/>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <Field name="lastname" label="Příjmení" show={this.state.show}  component={Input} type="text"/>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <Field name="phone" label="Telefon" show={this.state.show}  component={Input} type="text"/>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <Field name="company" label="Firma" show={this.state.show}  component={Input} type="text"/>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <Field name="street" label="Ulice" show={this.state.show}  component={Input} type="text"/>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <Field name="number" label="Číslo domu" show={this.state.show}  component={Input} type="number"/>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <Field name="district" label="Okres" show={this.state.show}  component={Input} type="text"/>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <Field name="city" label="Město" show={this.state.show}  component={Input} type="text"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <Field name="zip" label="PSČ" show={this.state.show}  component={Input} type="text"/>

                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <Field name="country" label="Země" show={this.state.show}  component={Input} type="text"/>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6 col-md-4 col-lg-4">
                    <Field name="ic" label="IC" show={this.state.show}  component={Input} type="text"/>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-4">
                    <Field name="ico" label="ICO" show={this.state.show}  component={Input} type="text"/>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-4">
                    <Field name="dic" label="DIC" show={this.state.show}  component={Input} type="text"/>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
    }}
}

export default Address;
