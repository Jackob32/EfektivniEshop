import React, {Component} from 'react';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';
import {flatten} from 'un-flatten-tree';

class MySelect extends Component {
    constructor(props) {
        super(props);

        let disabled=false;
        if(this.props.disabled)
            disabled=true;
        this.state = {
            data: props.data,
            options: props.options,
            name: props.name,
            backspaceRemoves: true,
            disabled:disabled,
            multi: this.props.multi==null && true,
            internaly: this.props.internaly
        };
        this.getOptions=this.getOptions.bind(this);
    }
    componentWillMount() {
        if(!this.state.internaly)
        this.handleInitialize();

        if(this.props.fce)
            this.props.fce(this.props.input.value);

    }
    handleInitialize() {
        return fetch(this.props.url)
            .then((response) => response.json())
            .then((json) => {
                if(this.props.url=="/api/categories"){
                    let list = flatten(
                        json,
                        node => node.children, // obtain child nodes
                        node => node   // create output node
                    );
                    this.setState({options: list});
                }else {
                    this.setState({options: json});
                }
            });
    }

    gotoUser(value) {
        window.open(value.html_url);
    }
    getOptions (input) {
       /* if (!input) {
            return Promise.resolve({ options: [] });
        }
*/
      //  return fetch(`https://api.github.com/search/users?q=${input}`)
        return fetch(this.props.url)
            .then((response) => response.json())
            .then((json) => {
            if(this.props.url=="/api/categories"){
                let list = flatten(
                    json,
                    node => node.children, // obtain child nodes
                    node => node   // create output node
                );
                return {options: list};
            }else {
                return {options: json};
            }
            });
    }
    render() {

        const {input, label, meta: {touched, error, warning}}=this.props;
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


            {this.state.internaly ?
                <Select
                    autofocus
                    {...this.props}
                    className={controlstyle}
                    loadOptions={this.getOptions}
                    // options={this.state.options}
                    simpleValue
                    clearable={this.state.clearable}
                    disabled={this.state.disabled}
                    value={this.props.input.value?this.props.input.value:this.props.defaultvalue}
                    multi={this.state.multi}
                    searchable={this.state.searchable}
                    onChange={(value) => (this.props.input.onChange(value), this.props.fce != null && this.props.fce(value))}
                    onBlur={() => (this.props.input.onBlur(this.props.input.value))}
                    placeholder="Vybrat"
                />
                :
                <Select.Async
                    {...this.props}
                    className={controlstyle}
                    multi={this.state.multi}
                    value={this.props.input.value?this.props.input.value:this.props.defaultvalue}
                    onChange={(value) => (this.props.input.onChange(value), this.props.fce != null && this.props.fce(value))}
                    onBlur={() => (this.props.input.onBlur(this.props.input.value))}
                    options={this.state.options}
                    valueKey={this.props.dataform.valueKey}
                    labelKey={this.props.dataform.labelKey}
                    backspaceRemoves={this.state.backspaceRemoves}
                    loadOptions={this.getOptions}
                    placeholder="Vybrat"
                />
            }


                    {touched &&
    ((error && <span className="help-block">{error}</span>) ||
    (warning && <span className="help-block">{warning}</span>))}
                </div>
            </div>

        )
    }
}

export default MySelect;
