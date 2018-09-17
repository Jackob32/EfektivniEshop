import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import MyFetch from '../../functions';

/*
const brandPrimary =  '#20a8d8';
const brandSuccess =  '#4dbd74';

 const brandDanger =   '#f86c6b';*/
const brandInfo =     '#63c2de';
// Card Chart 1

// Main Chart

// convert Hex to RGBA
function convertHex(hex,opacity) {
  hex = hex.replace('#','');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    let result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
  return result;
}

//Random Numbers
function random(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

let elements = 27;
let data1 = [];
let data2 = [];
let data3 = [];

for (let i = 0; i <= elements; i++) {
  data1.push(random(50,200));
  data2.push(random(80,100));
  data3.push(65);
}


class LinesChart extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            chyba: null,
            data: {},
            days: 30,
            mainChartOpts : {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },

                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                        hoverBorderWidth: 3,
                    }
                }
            }
        };
        this.handleInitialize = this.handleInitialize.bind(this);
        this.handleProcessData = this.handleProcessData.bind(this);
        this.dateFormatter = this.dateFormatter.bind(this);
    }
    componentWillMount() {
        this.handleInitialize();
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    handleInitialize() {
        MyFetch(this.props.source + "/" + this.props.data + "/" + this.state.days)
            .then(data => {
            this.handleProcessData(data.items);
        }).catch(error => {

            this.setState({error: error});
        });
    }
    dateFormatter(cell) {
    cell=Date.parse(cell);
    cell=new Date(cell);
    return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
}
    handleProcessData(data) {
        let labels=[];
        let newdata=[];
        let i=0;
        let to = new Date();
        let from = new Date();
        from.setDate(from.getDate()-this.state.days);

                for (let d = from; d <= to; d.setDate(d.getDate() + 1)) {
                    if (data && data[i] && data[i]._id && data[i]._id.day === d.getDate() && data[i]._id.month === (d.getMonth() + 1) && data[i]._id.year === d.getFullYear()) {
                      newdata.push(data[i].total);
                      i++;
                  }else {

                      newdata.push(0);
                  }
                    labels.push(this.dateFormatter(new Date(d)));
                }
        let dataset={
          data: newdata,
            label: 'My First dataset',
            backgroundColor: convertHex(brandInfo,10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2
        };

        let ProcessedData={};
         ProcessedData.labels=labels;
         ProcessedData.datasets=[];
         ProcessedData.datasets.push(dataset);


        this.setState({
            data: ProcessedData
        });
    }


    render() {

        Array.prototype.diff = function(a) {
            return this.filter(function(i) {return a.indexOf(i) < 0;});
        };

        return (
            <div className="animated fadeIn">

              <div className="card">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-5">
                      <h4 className="card-title mb-0">{this.props.name} za posledních {this.state.days} dní</h4>
                      <div className="small text-muted">{this.state.date}</div>
                    </div>

                  </div>
                  <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
                    <Line data={this.state.data} options={this.state.mainChartOpts} height={300}/>
                  </div>
                </div>

              </div>
            </div>
        )
    }
}
/*
<div className="card-footer">
  <ul>
    <li>
      <div className="text-muted">Visits</div>
      <strong>29.703 Users (40%)</strong>
      <Progress className="progress-xs mt-2" color="success" value="40" />
    </li>
    <li className="hidden-sm-down">
      <div className="text-muted">Unique</div>
      <strong>24.093 Users (20%)</strong>
      <Progress className="progress-xs mt-2" color="info" value="20" />
    </li>
    <li>
      <div className="text-muted">Pageviews</div>
      <strong>78.706 Views (60%)</strong>
      <Progress className="progress-xs mt-2" color="warning" value="60" />
    </li>
    <li className="hidden-sm-down">
      <div className="text-muted">New Users</div>
      <strong>22.123 Users (80%)</strong>
      <Progress className="progress-xs mt-2" color="danger" value="80" />
    </li>
    <li className="hidden-sm-down">
      <div className="text-muted">Bounce Rate</div>
      <strong>40.15%</strong>
      <Progress className="progress-xs mt-2" color="primary" value="40" />
    </li>
  </ul>
</div>*/
/*

<div className="col-sm-7 hidden-sm-down">
  <button type="button" className="btn btn-primary float-right"><i className="icon-cloud-download"></i></button>
  <div className="btn-toolbar float-right" role="toolbar" aria-label="Toolbar with button groups">
    <div className="btn-group mr-3" data-toggle="buttons" aria-label="First group">
      <label className="btn btn-outline-secondary">
        <input type="radio" name="options" id="option1"/> Day
      </label>
      <label className="btn btn-outline-secondary active">
        <input type="radio" name="options" id="option2" defaultChecked/> Month
      </label>
      <label className="btn btn-outline-secondary">
        <input type="radio" name="options" id="option3"/> Year
      </label>
    </div>
  </div>
</div>*/

class Statistics extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <LinesChart source="/api/stats" name="Objednávky" data="Orders" />
        <LinesChart source="/api/stats" name="Uživatelé" data="Users" />
        <LinesChart source="/api/stats" name="Produkty" data="Products" />


      </div>
    )
  }
}

export default Statistics;
