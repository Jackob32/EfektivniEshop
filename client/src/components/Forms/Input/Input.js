
import React, {Component} from 'react';
import 'react-select-plus/dist/react-select-plus.css';


class Input extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {show, disabled, input, label, type, meta: {touched, error, warning}}=this.props;

        if(this.props.type=='date'){
            console.log(this.props.input.value);
        }
        let formstyle = "row form-group";
        let controlstyle = "form-control";
        let row="";
        let divStyle="";
        let labelStyle="form-form-control-label";

        if(this.props.inline!==null){
            row="row";
            divStyle="col-md-9";
            labelStyle="col-md-3 form-control-label";
        }
        if(label==""){
            divStyle="col-md-12";
        }
        if (touched && !error && !warning){
            formstyle = row+" form-group has-success";
            controlstyle = "form-control form-control-success";
        }else if (touched && !error && warning){
            formstyle = row+" form-group has-warning";
            controlstyle = "form-control form-control-warning";
        }else if(touched && error) {
            formstyle = row+" form-group has-danger has-feedback";
            controlstyle = "form-control form-control-danger";
        }

        return (

            <div className={formstyle}>
                {label!="" && <label className={labelStyle} htmlFor={label}>
                    {label}
                </label>}
                <div className={divStyle}>

                    {(show==null || show==true) ? <input {...this.props} className={controlstyle} {...input} placeholder={label} id={label} disabled={disabled}/>:<span>{input.value}</span>}


                    {touched &&
                    ((error && <span className="help-block">{error}</span>) ||
                    (warning && <span className="help-block">{warning}</span>))}
                 </div>
            </div>
        );
    }
}

export default Input;

