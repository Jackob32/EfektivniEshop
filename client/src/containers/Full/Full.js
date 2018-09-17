import React, {Component} from 'react';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
//import Footer from '../../components/Footer/';
import {Redirect, Route, Switch} from 'react-router-dom'
import {Breadcrumbs} from 'react-breadcrumbs';
import routes from '../../routes';


class Full extends Component {
    render() {
        return (
            <div className="app">
                <Header/>
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumbs
                            wrapperElement="ol"
                            wrapperClass="breadcrumb"
                            itemClass="breadcrumb-item"
                            separator=""
                            routes={this.props.routes}
                            params={this.props.params}
                        />
                        <div>
                            <Switch>
                                {routes.map((route, idx) => {
                                        return route.component ? (
                                                <Route key={idx} path={route.path} exact={route.exact} name={route.name}
                                                       render={props => (
                                                           <route.component {...props} />
                                                       )}/>)
                                            : (null);
                                    },
                                )}
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>

                        </div>

                    </main>
                </div>

            </div>
        );
    }
}

export default Full;
