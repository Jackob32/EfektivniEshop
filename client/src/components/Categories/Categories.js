import React, { Component } from 'react';
/* eslint-disable */
import  SortableTree, {getTreeFromFlatData,defaultGetNodeKey,getFlatDataFromTree,changeNodeAtPath,getNodeAtPath, removeNodeAtPath, addNodeUnderParent} from 'react-sortable-tree';

import MyFetch from '../../functions';


class Update extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.rowInfo);
        this.state = {
            value: "",
            rowInfo:this.props.rowInfo
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();

        this.props.updateNode(this.state.rowInfo,this.state.value);
        this.setState({value: ""});
    }
    render() {
        return (
            <form className="form-inline" onSubmit={this.handleSubmit} style={{display: "inline"}}>
                <input style={{display: "inline"}} className="form-control input-sm" type="text" value={this.state.value} onChange={this.handleChange} />
                <button className="btn btn-primary" type="submit"><i className="fa fa-edit"></i></button>
              </form>
        );
    }
}

class Categories extends Component {

  constructor(props) {
    super(props);
      this.state = {
          treeData: [{
              "_id": "590eecb5f66639db2181b84d",
              "title": "kategorie",
              "__v": 0,
              "children": [
              ]
          }],
          globalerr: null
      };
      this.updateTreeData=this.updateTreeData.bind(this);
      this.removeNode=this.removeNode.bind(this);
      this.addNode=this.addNode.bind(this);
      this.updateNode=this.updateNode.bind(this);
      this.handleinitialize=this.handleinitialize.bind(this);
      this.addNewNode=this.addNewNode.bind(this);

  }

//<TicketingForm />
//<ExampleForm submitFormAction=""/>


    componentDidMount() {
        this.handleinitialize();
    }
    handleinitialize() {
         MyFetch("/api/categories")
            .then(data => {
                this.updateTreeData( data );
                //this.setState( data );
                // console.log(data);
            }).catch(error => {
             if(error.ok==false && error.status==500){
                 this.setState({globalerr:"Chyba připojení k serveru"});
             }

      //      this.forceUpdate();
             console.error(err);
        });
    }

    updateTreeData(treeData){

        //   console.log(treeData);
if(treeData[0]==null){

    treeData={
        "_id": "590eecb5f66639db2181b84d",
        "title": "Prazdny",
        "__v": 0,
        "children": [
        ]
    }
}
        let oldData = this.state.treeData;
        this.setState({treeData});
            let fetchData = {
                method: 'PUT',
                body: JSON.stringify(treeData)
            };
            MyFetch("/api/categories", fetchData).then(data => {

            }).catch(err => {
                this.setState({oldData});

                console.error({err});
            });
    }
    removeNode(rowInfo) {
        if (confirm('Opravdu chcete odstranit tuto kategorii a všechny její podkategorie?')) {
            let {node, treeIndex, path} = rowInfo;
            this.updateTreeData(removeNodeAtPath({
                    treeData: this.state.treeData,
                    path: path,   // You can use path from here
                    getNodeKey: ({treeIndex}) => treeIndex,
                    ignoreCollapsed: false,
                })
            );
        }
    }

    updateNode(rowInfo,text) {
        let {node, treeIndex, path} = rowInfo;
        node.title = text;
        let NewData = changeNodeAtPath({
            treeData: this.state.treeData,
            path: path,   // You can use path from here
            newNode: node,
            getNodeKey: ({ treeIndex }) =>  treeIndex,
            ignoreCollapsed: false
    })
        console.log(NewData);
        this.updateTreeData(NewData);
    }
    addNewNode(){
        let NEW_NODE = {"title": "kategorie",
            "children": [
            ]};
        let treeData=this.state.treeData;
        treeData.push(NEW_NODE);
        this.updateTreeData(treeData);
    }



    addNode(rowInfo){
        let NEW_NODE = {title: ''};
        let {node, treeIndex, path} = rowInfo;
        path.pop();
        let parentNode = getNodeAtPath({
            treeData: this.state.treeData,
            path : path,
            getNodeKey: ({ treeIndex }) =>  treeIndex,
            ignoreCollapsed : true
        });
        let getNodeKey = ({ node: object, treeIndex: number }) => {
            return number;
        };
        let parentKey = getNodeKey(parentNode);
        if(parentKey == -1) {
            parentKey = null;
        }
        let newTree = addNodeUnderParent({
            treeData: this.state.treeData,
            newNode: NEW_NODE,
            expandParent: true,
            parentKey: parentKey,
            getNodeKey: ({ treeIndex }) =>  treeIndex
        });
        this.updateTreeData(newTree.treeData);
    }
    /*
<Link to={'/products/new'}>
<button type="button" className="btn btn-success"><i className="fa fa-plus"></i>&nbsp; Nový produkt</button>
</Link>*/
    render() {
    return (
        <div>     {this.state.globalerr ?  <div className="card card-inverse card-danger">
                <div className="card-header"><strong>{this.state.globalerr}</strong></div>
            </div>:
<div>

                      <div style={{height: 550}}>
                          <SortableTree
                              treeData={this.state.treeData}
                              onChange={this.updateTreeData}
                              generateNodeProps={rowInfo => ({
                                  buttons: [
                                      <span>
                              <Update updateNode={this.updateNode} rowInfo={rowInfo} value={rowInfo.node.title} />
                              <button className="btn btn-danger" label='Delete'
                                      onClick={(event) => this.removeNode(rowInfo)}><i
                                  className="fa fa-remove"> </i></button>
                          <button className="btn btn-success" label='Add' onClick={(event) => this.addNode(rowInfo)}><i
                              className="fa fa-plus"> </i></button>
                          </span>,
                                  ],
                              })}
                          />
                      </div>
</div>}
        </div>
    )
  }
}


export default Categories;

