import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import {Provider} from 'react-redux';
import routes from './routes';
import { Router, browserHistory } from 'react-router';


ReactDOM.render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
    </Provider>
    , document.getElementById('root')
);
