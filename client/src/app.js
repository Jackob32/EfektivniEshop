import { Router, browserHistory } from 'react-router';

import routes from './routes';
import React, { Component } from 'react';

class App extends Component {

    render() {
        return (
            <Router routes={routes} history={browserHistory} />
        );
    }
}

export default App;