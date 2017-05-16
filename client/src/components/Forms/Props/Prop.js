import React, {Component} from 'react';
import Input from '../Input/Input';
import Select from '../Select/Select';
import {Field} from 'redux-form';

import 'react-select-plus/dist/react-select-plus.css';

class Prop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            options: props.options,
            name: props.name,
            backspaceRemoves: true,
            multi: true,
            //  type: this.props.OldPropsValues[this.props.index].type!=null ? this.props.OldPropsValues[this.props.index].type : "text"
              type: "text"
        };
     //   this.getOptions=this.getOptions.bind(this);
    }

    render() {

        const {disabled, member, index, fields} = this.props;


        return (
                    <tr key={index}>
<td>
                        <button className="btn btn-sm btn-danger"
                            type="button"
                            title="Odstranit"
                            onClick={() => fields.remove(index)}
                        >Odstranit</button>
</td><td>

                        <Field
                            name={`${member}.name`}
                            type="text"
                            component={Input}
                            label=""
                            disabled={disabled}
                        />
                    </td><td>
                         <Field label="" multi={false} internaly={true} disabled={disabled} name={`${member}.type`} component={Select}

                                options={[
                                    {value:"text",label:"Text"},
                                    {value:"checkbox",label:"Ano/Ne"},
                                    {value:"color",label:"Barva"},
                                    {value:"date",label:"Datum"},
                                    {value:"number",label:"Číslo"},
                                ]}
                                fce={(value)=>{this.setState({type:value})}}>



                    </Field>
                    </td><td>
                       <Field
                            name={`${member}.value`}
                            type={this.state.type}
                            component={Input}
                            label=""
                        />
                    </td><td>
                        <Field
                            name={`${member}.measurement`}
                            type="text"
                            component={Input}
                            label=""
                            disabled={disabled}
                        />
                    </td>
                    </tr>
        )
    }
}
/*
<Field name="pairprop" type="text" component={Select} data={} url=""
       dataform={{valueKey: "_id", labelKey: "name", recursive: false}}
       label="Vlastnosti"/>
*/
export default Prop;



/*
 <option value="text">text</option>
 <option value="checkbox">Ano/Ne</option>
 <option value="color">Barva</option>
 <option value="date">Datum</option>
 <option value="number">Číslo</option>
* */