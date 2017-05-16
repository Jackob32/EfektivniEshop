import React, {Component} from 'react';
import {Field} from 'redux-form';
import Select from '../../../components/Forms/Select/Select';
import Prop from './Prop';


import 'react-select-plus/dist/react-select-plus.css';


class Props extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            options: props.options,
            name: props.name,
            backspaceRemoves: true,
            multi: true
        };
        this.pridat=this.pridat.bind(this);
    }

    pridat(){
        this.props.OldPropsValues.forEach(function (wtf){
                this.props.fields.push(wtf);
        });
    }


    render() {

        const {OldPropsValues, fields, meta: {touched, error, submitFailed}} = this.props;


        return (


        <div className="col-lg-12">

            <div className="card">
                <div className="card-header">
                    Přidat existující parametry
                </div>
                <div className="card-block">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Akce</th>
                            <th>Název</th>
                            <th>Typ</th>
                            <th>Hodnota</th>
                            <th>Jednotka</th>
                        </tr>
                        </thead>
                        <tbody>

                        {fields.map((member, index) => (

                            <Prop member={member} key={index} index={index} {...this.props} disabled={true}/>
                        ))}

                        </tbody>
                    </table>

                    <Field name="OldPropsSelect" type="text" component={Select} url="/api/props"
                           dataform={{valueKey: "_id", labelKey: "name"}}
                           label=""/>
                    <button type="button" className="btn btn-primary btn-md btn-block" onClick={() => {
                        if(OldPropsValues)
                        OldPropsValues.forEach(function (item) {
                            fields.push(item);
                        });

                    }}>Přidat Existující Parametry
                    </button>
                    {(touched || submitFailed) && error && <span>{error}</span>}
                 </div>
            </div>
        </div>


        )
    }
}
/*
<Field name="pairprop" type="text" component={Select} data={} url=""
       dataform={{valueKey: "_id", labelKey: "name", recursive: false}}
       label="Vlastnosti"/>
 <li key={index}>

 <button
 type="button"
 title="Odstranit"
 onClick={() => fields.remove(index)}
 >Odstranit</button>

 <h4>Vlastnost #{index + 1}</h4>
 <Field
 name={`${member}.name`}
 type="text"
 component={Input}
 label="Název"
 />

 <Field
 name={`${member}.typ`}
 type="text"
 component={Input}
 label="Typ"
 />

 <Field name="pairprop" type="text" component={Select} url="/api/props"
 dataform={{valueKey: "_id", labelKey: "name"}}
 label="Vlastnosti"/>

 <Field
 name={`${member}.value`}
 type="text"
 component={Input}
 label="Hodnota"
 />
 <Field
 name={`${member}.value`}
 type="text"
 component={Input}
 label="Jednotka"
 />
 </li>

*/

export default Props;
