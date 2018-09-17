import React, {Component} from 'react';
import FilterTable from './../../components/FilterTable/FilterTable'
import {Link} from 'react-router-dom'

class Products extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
        this.handleForm = this.handleForm.bind(this);
    }
    handleForm(FormData){
        console.log(FormData);
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }


    render() {
        function buttonFormatter(cell, row){
            return (
                <Link to={'/users/'+row._id}>
                    <button type="button" className="btn btn-success">upravit</button>
                </Link>);
        }

        function nameFormatter(cell, row) {
            return row.firstname+"  "+row.lastname+"<br>"+"("+row.email+")";
        }
        function arrFormatter(cell, row) {
            return cell.length;
        }
        function CSVmodifier(row) {

          //  row.address=addressFormatter(row.address);

return row
        }
        function addressFormatter(cell, row) {

            if(!cell.city) cell.city="";
            if(!cell.district) cell.district="";
            if(!cell.street) cell.street="";
            if(!cell.number) cell.number="";
            if(!cell.zip) cell.zip="";

            if(!cell.number && !cell.street && !cell.district && !cell.district)
                cell.city="---";

            return cell.street+"  "+cell.number+"<br> "+cell.city+" <br> "+cell.zip;

        }

        function dateFormatter(cell) {
            cell=Date.parse(cell);
            cell=new Date(cell);
            return `${('0' + cell.getDate()).slice(-2)}.${('0' + (cell.getMonth() + 1)).slice(-2)}.${cell.getFullYear()}`;
        }

        function userFormatter(cell) {
            cell=Date.parse(cell);
            cell=new Date(cell);
            return `${('0' + cell.getDate()).slice(-2)}.${('0' + (cell.getMonth() + 1)).slice(-2)}.${cell.getFullYear()}`;
        }
        
//jmeno, prijmeni adresa, registrace, polozek v kosiku, objednavek, datum registrace

        let USERS = [
            {field: '_id', hidden: true, key: true, sort: true, label: 'User ID'},
            {field: 'firstname', filter: { type: 'TextFilter'}, filterFormatted:true,editable:false,
                hidden: false, key: false, sort: true, label: 'Uživatel', dataFormat: nameFormatter},
            {field: 'address', filter: { type: 'TextFilter'}, filterFormatted:true, editable:false,
                hidden: false, key: false, sort: true, label: 'Adresa', dataFormat: addressFormatter},
            {field: 'dateRegistration',   filter:{  type: 'DateFilter' },hidden: false,
                editable: false ,
                sort: true, label: 'Datum \n registrace', dataFormat: dateFormatter},
            {field: 'basket', editable: false ,hidden: false, key: false, sort: true, label: 'Položek v košíku', dataFormat: arrFormatter},
       //     {field: 'orders', hidden: false, key: false, sort: true, label: 'Počet', dataFormat: arrFormatter}
        ];
        let options =  {
            modalNew: 'Nový uživatel',
            delete: true,
            key: true,
            sort: true,
            label: 'User ID',
            actions: true,
            actionsFormatter: buttonFormatter,
            actionsURL: '/users/',
            sortname: 'dateRegistration',
            CSV: CSVmodifier
        };

        return (
            <div className="animated fadeIn">

                <FilterTable dataModel={USERS} customNew={true} customNewText="Nový" options={options} fetchUrl="/api/users/" submitFormAction={this.handleForm}/>
            </div>
        )
    }
}
export default Products;