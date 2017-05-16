import React, { Component } from 'react';
import Table from 'react-filterable-table';


class FilterableTable extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
        sgTeams : [
            {id: 561456, img: "Akademiks Rays Alight" ,name: "Akademiks Rays Alight", price: "Oneil", visible: true, category: "shoes", fce: <button onClick={this.handleDelete}>popup</button>},
            {id: 56161, img: "Akademiks Rays Alight" ,name: "Maui Jim Ho'okipa Tennessee", price: "Kawalsky", visible: false, category: "t-shird", fce: <button onClick={this.handleDelete}>aha</button>},
        ],
        fields : [
            { name: 'img', displayName: "Obrázek"},
            { name: 'name', displayName: "Název", inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'price', displayName: "Cena", inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'visible', displayName: "Viditelnost", exactFilterable: true, sortable: true },
            { name: 'category', displayName: "Kategorie", inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'fce', displayName: "Akce", inputFilterable: true, sortable: true }
        ]
    };

  }


  handleDelete(){
      this.setState({sgTeams: this.state.sgTeams.splice(1, 1)});

      console.log('splice omg!!!');
  }
  toggle(tab) {

    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
        <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> Striped Table
              </div>
          <Table
              stickySorting="true"
              className="card-block"
              tableClassName="table table-striped"
              namespace="People"
              initialSort="name"
              data={this.state.sgTeams}
              fields={this.state.fields}
              noRecordsMessage="Zadna data"
              noFilteredRecordsMessage="No people match your filters!"
          />
          </div>
          </div>
        </div>
        </div>
    )
  }
}

export default FilterableTable;
