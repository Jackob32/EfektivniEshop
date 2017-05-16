import React, {Component} from 'react';
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
     //   this.getOptions=this.getOptions.bind(this);
    }
/*
    gotoUser (value, event) {
        window.open(value.html_url);
    }
    getOptions (input) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }

      //  return fetch(`https://api.github.com/search/users?q=${input}`)
        return fetch(this.props.url)
            .then((response) => response.json())
            .then((json) => {

            if(this.props.dataform.recursive){

                for (let key in json) {
                    if (json.hasOwnProperty(key))
                    if (key == "name") {
                        // do something...

                        console.log(key);
                    }
                }
            }else{
                console.log(json);
                return { options: json };
            }
            });
    }
    */
    render() {

        const {fields, meta: {touched, error, submitFailed}} = this.props;
        return (




        <div className="col-lg-12">

            <div className="card">
                <div className="card-header">
                    Přidat nové parametry

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
                            <Prop member={member} key={index} index={index} {...this.props} />
                        ))}

                        </tbody>
                    </table>
                    <button type="button" className="btn btn-primary btn-md btn-block"
                            onClick={() => fields.push({item: "befree"})}>Přidat nový parametr
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
