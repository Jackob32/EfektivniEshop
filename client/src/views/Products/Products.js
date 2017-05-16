import React, { Component } from 'react';
import FilterableTable  from './../../components/FilterableTable/FilterableTable'
import FilterTable  from './../../components/FilterTable/FilterTable'
import { Link } from 'react-router'
import MyFetch from '../../functions';
class Products extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            info: {},
            general: {}
        };
        this.handleForm = this.handleForm.bind(this)
        this.buttonFormatter = this.buttonFormatter.bind(this)
        this.price = this.price.bind(this)
    }

    price(cell, row, enumObject) {
        let currency = 'Kč';
        if (this.state.general && this.state.general.currency)
            currency = this.state.general.currency;
        if (cell) return cell + " " + currency;
    }

    componentWillMount() {
        this.handleInitialize();
    }

    handleInitialize() {
        MyFetch('/api/settings/info').then(data => {
            this.setState({info: data});
        }).catch(error => {
            //   console.log(error);
        });

        MyFetch('/api/settings/general').then(data => {
            this.setState({general: data});
        }).catch(error => {
            // console.log(error);
        });
    }
    handleForm(FormData){

    //    console.log(FormData);

    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    buttonFormatter(cell, row){
    return (
        <Link to={'/products/'+row._id}>
            <button type="button" className="btn btn-success">upravit</button>
        </Link>);
}


//<TicketingForm />
//<ExampleForm submitFormAction=""/>

    render() {

        function bool(cell, row, enumObject) {
            if(cell) return 'ANO';
            return 'NE';
        }

        function ks(cell, row, enumObject) {

            if(cell) return cell+' Ks';
        }
        function dateFormatter(cell, row) {
            cell=Date.parse(cell);
            cell=new Date(cell);
            return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
        }
        function filterType(cell, row) {
            // just return type for filtering or searching.
            if(cell) return 'ANO';
            return 'NE';
        }
        function numberValidate(value, row) {
            if (isNaN(parseInt(value, 10))) {
                return 'Cena musí být číslo!';
            }
            if (value<0) {
                return 'Cena musí být kladná!';
            }
            return true;
        }

        let PRODUCTS = [
            {field: '_id', hidden: true, key: true, sort: true, label: 'Product ID'},
            {field: 'name', width:'15%',filter: { type: 'TextFilter'}, sort: true, label: 'Název'},
            {field: 'visible',width:'10%', filter: {selectText: 'Zvolit' , type: 'SelectFilter',
                options: {
                "false": "NE",
                "true": "ANO"
            }} ,
                editable: { type: 'checkbox', options: { values:
                    "0:1"
                 }} ,
                filterValue: filterType ,
                sort: true, label: 'Viditelnost', dataFormat: bool},

            {field: 'price', editable: { type: 'number', validator: numberValidate } ,width:'12%', filter: {  defaultValue: { comparator: '=' } , type: 'NumberFilter', numberComparators: [ '=', '>', '<' ]} ,
                sort: true, label: 'Cena', dataFormat: this.price
            },
            {field: 'min_description', filter: {filterText: 'Filtrovat', type: 'TextFilter'},hidden: false,  sort: true, label: 'Apex'},
            {field: 'date',  filter:{  type: 'DateFilter' },hidden: false,
                editable: false ,
                sort: true, label: 'Datum', dataFormat: dateFormatter},
            {field: 'code', filter: {filterText: 'Filtrovat', type: 'TextFilter'},  sort: true, label: 'Kód'},
            {field: 'count', width:'12%', editable: { type: 'number', validator: numberValidate } ,
                filter: {  defaultValue: { comparator: '=' } , type: 'NumberFilter',
                    numberComparators: [ '=', '>', '<' ]} ,
                sort: true, label: 'Počet', dataFormat: ks}
        ];

        let options =  {
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
        return (
            <div className="animated fadeIn">

                <FilterTable options={options} customNew={true} customNewText="Nový"  dataModel={PRODUCTS}  fetchUrl="/api/products/" submitFormAction={this.handleForm}/>

            </div>
        )
    }
}

export default Products;
