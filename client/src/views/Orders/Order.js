import React, { Component } from 'react';
import FilterTable  from './../../components/FilterTable/FilterTable'
import { Link } from 'react-router'
import MyFetch from '../../functions';
class Products extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            states:[],
            transports:[],
            statesVal:[],
            transportsVal:[]
        };
        this.handleForm = this.handleForm.bind(this);
        this.price = this.price.bind(this)
    }
    price(cell, row, enumObject) {
        let currency = 'Kč';
        if (this.state.general && this.state.general.currency)
            currency = this.state.general.currency;
        if (cell) return cell + " " + currency;
    }

    handleForm(FormData){
      //  console.log(FormData);
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    handleinitialize() {
        MyFetch('/api/transports/')
            .then(data => {

                let resArr=[];
                let resArrVal=[];
                data.forEach((item, index, arr)=>{
                    resArr[item._id]=item.name;
                    resArrVal.push(item._id);
                });


                this.setState({transports: resArr, transportsVal:resArrVal})
            }).catch(err => {
            this.forceUpdate();
            console.error(err.msg);
        });

        MyFetch('/api/states/')
            .then(data => {
                let resArr=[];
                let resArrVal=[];
                data.forEach((item, index, arr)=>{
                    resArr[item._id]=item.name;
                    resArrVal.push(item._id);
                });
                this.setState({states: resArr, statesVal:resArrVal})

                console.log(resArr);
                console.log(resArrVal);

            }).catch(err => {
            this.forceUpdate();
            console.error(err.msg);
        });
        MyFetch('/api/settings/general').then(data => {
            this.setState({general: data});
        }).catch(error => {
            // console.log(error);
        });
    }
    componentWillMount() {
        if(!this.state.offline)
            this.handleinitialize();
    }

    render() {
        function buttonFormatter(cell, row){
            return (
                <Link to={'/orders/'+row._id}>
                    <button type="button" className="btn btn-success">upravit</button>
                </Link>);
        }


        const transportType = {
            "5903b065cb3348c31021bb2b": "DHL",
            "590a4bdd00f94f28709a617d": "wčzret"
        };

     //   console.log("transportType");  console.log(transportType);

        const statusType = {
            0: 'good',
            1: 'Bad',
            2: 'unknown'
        };
        function Formatter(cell, row, enumObject) {
            return  enumObject[cell]
        }
        function statusFormatter(cell, row, enumObject) {
            let res="nic";

            enumObject.forEach((item, index, arr)=>{
             if(enumObject[index]._id==cell) res=enumObject[index].name;
             });
            return res;
        }


        function dateFormatter(cell, row) {
            cell=Date.parse(cell);
            cell=new Date(cell);
            return `${('0' + cell.getDate()).slice(-2)}.${('0' + (cell.getMonth() + 1)).slice(-2)}.${cell.getFullYear()}`;
        }
        function nameFormatter(cell, row) {
            if(cell)

                return cell.firstname+"  "+cell.lastname;

            else if(row.billingAddress){

                return row.billingAddress.firstname+"  "+row.billingAddress.lastname;
            }else{
                return "neznámý";
            }

        }

      //  console.log(this.state.transport);

        let ORDER = [
            {field: '_id', hidden: true, key: true, sort: true, label: 'Order ID'},
            {field: 'user', filter: { type: 'TextFilter'},
                sort: true,
                label: 'Uživatel',
                filterFormatted:true,editable:false,
                dataFormat: nameFormatter},
            {
                field: 'code', filter: {type: 'TextFilter'},
                sort: true,
                label: 'Kód',
                editable: false
            },
            {field: 'transport',  sort: true, label: 'Doprava', filterFormatted:false,
                formatExtraData: this.state.transports  , dataFormat: Formatter,
                filter:{selectText: 'Zvolit', type: 'SelectFilter', options: this.state.transports},
                editable: { type: 'select', options: { values: this.state.transportsVal } }
            },
            {field: 'status',  sort: true, label: 'Stav', filterFormatted:false,
                formatExtraData: this.state.states , dataFormat: Formatter,
                filter:{selectText: 'Zvolit', type: 'SelectFilter', options: this.state.states},
                editable: { type: 'select', options: { values:this.state.statesVal} }
            },
            {field: 'dateCreated',   filter:{  type: 'DateFilter' },hidden: false,
                editable: false ,
                sort: true, label: 'Vytvořeno', dataFormat: dateFormatter},
            {field: 'dateChanged',   filter:{  type: 'DateFilter' },hidden: false,
                editable: false ,
                sort: true, label: 'Změněno', dataFormat: dateFormatter},
            {field: 'price',editable:false,
                filter: {  defaultValue: { comparator: '=' } , type: 'NumberFilter', numberComparators: [ '=', '>', '<' ]} ,
                sort: true, label: 'Cena', dataFormat: this.price
            },
        ];


        let options =  {
            modalNew: 'Nový dopravce',
            delete: true,
            key: true,
            sort: true,
            label: 'Order ID',
            actions: true,
            actionsFormatter: buttonFormatter,
            actionsURL: '/orders/',
            sortname: 'status'
        };


        return (
            <div className="animated fadeIn">

                <FilterTable customNew={true} customNewText="Nový"  dataModel={ORDER} fetchUrl="/api/orders/" options={options} submitFormAction={this.handleForm}/>
            </div>
        )
    }
}
export default Products;