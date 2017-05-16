import React, {Component} from 'react';

class TextArea extends Component {
    constructor(props) {
        super(props);
      /*  this.state = {
            data: props.data,
            options: props.options,
            name: props.name,
            backspaceRemoves: true,
            multi: true
        };*/
    }

    render() {
        const {input, label, type, meta: {asyncValidating, touched, error, warning}}=this.props;
        let formstyle = "row form-group";
        let controlstyle = "form-control";
        let row="";
        let divStyle="";
        let labelStyle="form-form-control-label";

        if(this.props.inline!==null){
            row="row";
            divStyle="col-md-9";
            labelStyle="col-md-3 form-control-label";
        }  if(label==""){
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

                {asyncValidating ? <span>AsyncValidation</span> : ''}
                <div className={divStyle}>
                    <textarea className={controlstyle}  {...input} placeholder={label} id={label} type={type}/>
                    {touched &&
                    ((error && <span className="help-block">{error}</span>) ||
                    (warning && <span className="help-block">{warning}</span>))}
            </div>
            </div>
        )
    }
}

export default TextArea;
