import React, { Component } from 'react';
/* eslint-disable */

import CategoriesComponent from './../../components/Categories/Categories'


class Categories extends Component {

  constructor(props) {
    super(props);
  }

    render() {
    return (
      <div className="animated fadeIn">

          <h2> Kategorie</h2>

          <div className="col-sm-12 col-md-12">
              <div className="card card-accent-primary">

                  <div className="card-block">


                      <CategoriesComponent />

                      </div>

                  </div>
              </div>
          </div>

    )
  }
}


export default Categories;

