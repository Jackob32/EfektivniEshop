import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Full from "./containers/Full";

import Login from './views/Pages/Login';
import Page404 from './views/Pages/Page404';
import Page500 from './views/Pages/Page500';
import Register from './views/Pages/Register';


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" name="Login Page" component={Login}/>
                    <Route exact path="/register" name="Register Page" component={Register}/>
                    <Route exact path="/404" name="Page 404" component={Page404}/>
                    <Route exact path="/500" name="Page 500" component={Page500}/>
                    <Route path="/" name="Home" component={Full}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
