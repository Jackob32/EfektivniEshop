import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Containers
import Full from './containers/Full/'

import Dashboard from './views/Dashboard/'
import Statistics from './views/Statistics/'
import Orders from './views/Orders/'
import NewOrder from './views/Orders/NewOrder/'
import Products from './views/Products/'
import NewProduct from './views/Products/NewProduct/'
import Users from './views/Users/'
import NewUser from './views/Users/NewUser/'

//Settings
import Settings from './views/Settings/'
import Categories from './views/Categories/'
import Info from './views/Settings/Info/'
import Transports from './views/Settings/Transports/'
import General from './views/Settings/General/'
import Props from './views/Settings/Props/'
import PaymentType from './views/Settings/PaymentTypes'
import StateType from './views/Settings/StateType'


import Page404 from './views/Pages/Page404/'

export default (
  <Router history={browserHistory}>
    <Route component={Page404}/>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Orders}/>
      <Route path="dashboard" name="Přehled" component={Dashboard}/>
      <Route path="statistics" name="Statistiky" component={Statistics}/>
      <Route path="orders/" name="Objednávky">
        <IndexRoute component={Orders}/>
        <Route path="new" name="Nová Objednávka" component={NewOrder}/>
        <Route path=":id" name="Upravit Objednávku" component={NewOrder}/>
        <Route path="show/:id" name="Náhled Objednávky" component={NewOrder}/>
      </Route>
      <Route path="products/" name="Produkty">
        <IndexRoute component={Products}/>
        <Route path="new" name="Nový Produkt" component={NewProduct}/>
        <Route path=":id" name="Upravit Product" component={NewProduct}/>
        <Route path="show/:id" name="Náhled Produktu" component={NewProduct}/>
      </Route>
      <Route path="users/" name="Uživatelé">
        <IndexRoute component={Users}/>
        <Route path="new" name="Nový Uživatel" component={NewUser}/>
        <Route path=":id" name="Upravit Uživatele" component={NewUser}/>
        <Route path="show/:id" name="Náhled Uživatele" component={NewUser}/>
      </Route>

      <Route path="settings/" name="Nastavení">
        <IndexRoute component={Settings}/>
        <Route path="info" name="Informace" component={Info}/>
        <Route path="general" name="Obecné" component={General}/>
        <Route path="categories" name="Kategorie" component={Categories}/>
        <Route path="props" name="Parametry" component={Props}/>
        <Route path="transports" name="Dopravci" component={Transports}/>
        <Route path="paymenttypes" name="Typy Plateb" component={PaymentType}/>
        <Route path="statetypes" name="Stavy Objednávek" component={StateType}/>
      </Route>

    </Route>
  </Router>
);
