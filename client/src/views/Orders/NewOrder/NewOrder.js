import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'react-select-plus/dist/react-select-plus.css';
import Select from '../../../components/Forms/Select/Select';
import TextArea from '../../../components/Forms/TextArea/TextArea';
import Input from '../../../components/Forms/Input/Input';
import Address from '../../../components/Address/Address';
import ChangeForm from '../../../components/ChangeForm/';
import FilterTable  from '../../../components/FilterTable/FilterTable'
import MyFetch  from './../../../functions'
import dateFormat from 'dateformat';
import { Link } from 'react-router'
let PrintTemplate = require('react-print');


import {
    formValueSelector,
    Field,
    reduxForm,
    touched,
    FormSection,
    change
} from 'redux-form'

let validateName = function (name) {
    let re = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    return re.test(name)
};

function validate(values) {
    const errors = {};
    if (!values.code) {
        errors.code = 'Nastavte kod produktu';
    }
    if (!values.products || values.products.length === 0) {
        errors.products = 'Objednávka nemá žádný produkt';
    }

    if (!values.billingAddress) {
        errors.billingAddress = {};
        errors.billingAddress.lastname = 'Chybí jméno';
        errors.billingAddress.firstname = 'Chybí příjmení';
    }else{
        errors.billingAddress = {};

        if (!validateName(values.billingAddress.lastname)) {
            errors.billingAddress.lastname = 'Chybný tvat jména';
        }
        if (!validateName(values.billingAddress.firstname)) {
            errors.billingAddress.firstname = 'Chybný tvar příjmení';
        }
        if (!values.billingAddress.lastname) {
            errors.billingAddress.lastname = 'Křestní jméno je povinné pole';
        }
        if (!values.billingAddress.firstname) {
            errors.billingAddress.firstname = 'Přijmení je povinné pole';
        }
    }
    return errors;
}
function warn(values) {
    const warnings = {};
    /*
    if (!values.description) {
        warnings.description = 'Opravdu chcete nechat popis produktu nevyplněné?';
    } else {
        if (values.description.length < 5) {
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
    }
*/
    return warnings;
};

class NewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            print: "order",
            backspaceRemoves: true,
            multi: true,
            redirectToNewPage: false,
            id: this.props.params.id,
            info:null,
            general:null
        };
        this.submitModifier = this.submitModifier.bind(this);
        this.myOnchange = this.myOnchange.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.handleInitialize = this.handleInitialize.bind(this);

    }
    handleForm(FormData){

    }
    componentWillMount() {
            this.handleInitialize();
    }
    handleInitialize() {
        MyFetch('/api/settings/info').then(data => {
            this.setState({info:data});
        }).catch(error => {
         //   console.log(error);
        });

        MyFetch('/api/settings/general').then(data => {
            this.setState({general:data});
        }).catch(error => {
           // console.log(error);
        });
    }

    myOnchange(values){
        if(values.address) {
            values.address.same = true;
            this.props.dispatch(change('NewOrderForm', 'deliveryAddress', values.address));
            this.props.dispatch(change('NewOrderForm', 'billingAddress', values.address));
        }
        return values;
    }

    submitModifier(values){
        let price = 0;
        if(values.products)
            values.products.forEach(function(entry,i) {
                if(!values.products[i].number || values.products[i].number==0) values.products[i].number=1;
                price += (values.products[i].price * values.products[i].number);
            });

        if (values.transport != null) {
            price += values.transport.price;
        }
        values.price=price;
return values;
    }

     render() {
         const {billingAddress, pristine, dateCreated, code, transport, products, values} = this.props;

         function dateFormatter(cell) {
             cell = Date.parse(cell);
             cell = new Date(cell);
             return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
         }

         let currency = 'Kč';
         if (this.state.general && this.state.general.currency != null) {
             currency = this.state.general.currency;
         }
         let DPH = 21;
         if (this.state.general && this.state.general.fee != null) {
             DPH = this.state.general.fee;
         }

         function priceFormatter(cell, row, enumObject) {

             if (cell) return cell + currency;
         }

         function ks(cell, row, enumObject) {
             if (cell) return cell + ' Ks';
         }

         function dateFormatter(cell, row) {
             cell = Date.parse(cell);
             cell = new Date(cell);
             return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
         }

         function totalPrice(cell, row) {

             return (  row.number * row.price   ) + " " + currency;
         }

         function availible(cell, row) {
             let res = cell;
             if (row["number"])
                 res -= row["number"];
             if (res < 0) {
             res = 0;
             return (<span><b style={{color: "red" }}>{res + " Ks "}</b> ({cell-row["number"]})</span>);
         }
             return res+" Ks";
         }

         function link(cell, row) {

             return(  <Link to={'/products/'+row._id} target="_blank">
                 <u>{cell}</u>
             </Link>);

             }

         let PRODUCTS = [
             {field: '_id',editable: false, hidden: true, key: true, sort: true, label: 'Product ID'},
             {field: 'name', editable: false,width: '30%', sort: true, label: 'Název', dataFormat: link},
             {field: 'code',editable: false, sort: true, label: 'Kód'},
             {field: 'number', width: '12%', editable: {type: 'number'}, label: 'Pocet', dataFormat: ks},
             {field: 'count', editable: false, hidden: (this.state.id), width: '12%', label: 'Na skladě',  dataFormat: availible},

             {
                 field: 'price',
                 width: '12%',
                 editable: {type: 'number'},
                 sort: true,
                 label: 'Cena',
                 dataFormat: priceFormatter
             },
             {field: 'total', dataAlign: "right", editable: false, sort: true, label: 'Celkem', dataFormat: totalPrice}
         ];
         let options = {
             modalNew: 'Nový dopravce',
             delete: true,
             key: true,
             sort: true,
             label: 'Product ID',
             actions: true,
             actionsFormatter: this.buttonFormatter,
             actionsURL: '/products/',
             sortname: 'date'
         };

         let price = 0;
         if(products)
              products.forEach(function(entry,i,products) {
                 if(!products[i].number || products[i].number==0) products[i].number=1;
                 price += (products[i].price * products[i].number);
             });

         if (transport != null) {
             price += transport.price;
         }

       //  this.props.dispatch(change('NewOrderForm', 'price', price));


         let startbilling = "";

         if (billingAddress && billingAddress.firstname) {

             startbilling = "close";
         }

         return (
            <ChangeForm submitModifier={this.submitModifier}  {...this.props} redirect="/orders/" id={this.props.params.id} updateheadline="Upravit Objednávku"
                        newheadline="Nová Objednávka" url="/api/orders" formname="NewOrderForm">

                <div id="react-no-print">
                <a className="btn btn-default" href="javascript:window.print()" onMouseEnter={()=>(this.setState({print: "order"}))}  >
                    <i className="icon-print"> </i>
                    Tisknout objednávku
                </a>
                    <a className="btn btn-default"
                       href="javascript:window.print()" onMouseEnter={()=>(this.setState({print: "delivery"}))}>
                        <i className="icon-print"> </i>
                        Tisknout Dopravu
                    </a>
                    <a className="btn btn-default" href="javascript:window.print()" onMouseEnter={()=>(this.setState({print: "bill"}))}>
                        <i className="icon-print"> </i>
                        Tisknout Fakturu
                    </a>
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <Field name="code" type="text" label="Kód objednávky" component={Input}/>
                            </div>
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-6 col-lg-3">
                                        <Field name="user" type="text" component={Select} url="/api/users"
                                               dataform={{valueKey: "_id", labelKey: "lastname"}}
                                               label="Uživatel" multi={false} fce={this.myOnchange}/>
                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                                 <Field name="status" type="text" component={Select} url="/api/states"
                                               dataform={{valueKey: "_id", labelKey: "name"}}
                                               label="Stav Objednávky" multi={false} />

                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                        <Field name="paymentType" type="text" component={Select} url="/api/payments"
                                               dataform={{valueKey: "_id", labelKey: "name"}}
                                               label="Typ Platby" multi={false} />
                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                        <Field name="transport" type="text" component={Select} url="/api/transports"
                                               dataform={{valueKey: "_id", labelKey: "name"}}
                                               label="Dopravce" multi={false} />
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <FormSection name="billingAddress" >
                        <Address name="Fakturační adresa" onstart={startbilling}/>
                    </FormSection>

                     <FormSection name="deliveryAddress">
                         <Address name="Doručovací adresa" onstart=" Stejná Jako Fakturační" />
                      </FormSection>

                </div>
                    <div className="row">
                    <div className="col-md-12">


                        {products &&  <FilterTable formname='NewOrderForm' simple={true} dispatch={this.props.dispatch}
                                     data={products} dataModel={PRODUCTS} submitFormAction={this.handleForm}/>}

                        <table style={{marginTop: -20}} className="table table-bordered">
                            <tbody>
                            {transport!=null &&
                            <tr style={{textAlign: "right"}}>
                                <td width={'32%'}>{transport.name}</td>
                                <td width={'34%'}>{transport.description}</td>
                                <td width={'12%'}>{transport.deliverytime}</td>
                                <td>{transport.price} {currency}</td>
                            </tr>}
                            <tr style={{textAlign: "right"}}>
                                <td ></td>
                                <td></td>

                                <td >Celkem:</td>
                                <td>{price} {currency}</td>
                            </tr>
                            </tbody>
                        </table>
                        <Field name="products" type="text" component={Select} url="/api/products"
                               dataform={{valueKey: "_id", labelKey: "name"}}
                               label="Produkty"/>
                                <Field name="note" type="text" label="Poznámka" component={TextArea}/>
                    </div>
                </div>

                </div>

                <PrintTemplate>

                    {this.state.print === "order" && <h2>Objednávka: {code}</h2>}

                    {this.state.print === "bill" && <h2>Faktura: {code}</h2>}

                    {this.state.print === "delivery" && <h2>Dodací list: {code}</h2>}

                <div className="row">
                <FormSection name="billingAddress" >
                    <Address name="Fakturační adresa" onstart="open" simple={true} />
                </FormSection>
                <FormSection name="deliveryAddress">
                    <Address name="Doručovací adresa" onstart="open" simple={true} />
                    </FormSection>
                </div>


                <table style={{textAlign: "right"}} className="table table-bordered">
                <thead>
                    <tr>
                        <th>Kód faktury</th>
                        <th>Datum vystavení</th>
                        <th>Datum objednávky</th>

                    </tr>
                </thead>
                    <tbody>

                    <tr style={{textAlign: "right"}}>
                        <td>{code}</td>
                        <td>{dateFormatter(dateFormat(new Date(), "mm, dd, yyyy"))}</td>
                        <td>{dateFormatter(dateCreated)}</td>


                    </tr>

                    </tbody>
                </table>

                            {products &&
                            <table style={{textAlign: "right"}} className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Název</th>
                                    <th>Kód</th>
                                    <th>DPH</th>
                                    <th>Množství</th>
                                    <th>Cena za kus</th>
                                    <th>Cena</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product) =>(
                                        <tr key={product.name}>
                                            <td>{product.name}</td>
                                            <td>{product.code}</td>
                                            <td>{DPH}%</td>

                                            <td>{product.number}</td>
                                            <td>{product.price} {currency}</td>
                                            <td>{product.price*product.number} {currency}</td>
                                        </tr>
                                    )
                                )}
                                {transport!=null &&
                                <tr style={{textAlign: "right"}}>
                                    <td >{transport.name}</td>
                                    <td></td>
                                    <td></td>
                                    <td >{transport.description}</td>
                                    <td >{transport.deliverytime}</td>
                                    <td>{transport.price} {currency}</td>

                                </tr>}

                                <tr style={{textAlign: "right"}}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td ><small>Celkem bez DPH:</small></td>
                                    <td>
                                        <small>{price * ((100 - DPH) / 100)} {currency}</small>
                                    </td>
                                </tr>

                                <tr style={{textAlign: "right"}}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td ><strong>Celkem:</strong></td>
                                    <td><strong>{price} {currency}</strong></td>
                                </tr>
                                </tbody>
                            </table>}

                </PrintTemplate>

            </ChangeForm>
        )
    }
}


const Reform = reduxForm({
    form: 'NewOrderForm',
    validate,
    warn
})

const selector = formValueSelector('NewOrderForm'); // <-- same as form name

export default connect(
    state => ({
        paymentType:selector(state, 'paymentType'),
        dateCreated:selector(state, 'dateCreated'),
        billingAddress:selector(state, 'billingAddress'),
        code: selector(state, 'code'),
        products: selector(state, 'products'),
        transport: selector(state, 'transport'),
        user: selector(state, 'user'),
        initialValues: state.account.data, // pull initial values from account reducer
    }),
)(Reform(NewOrder));

