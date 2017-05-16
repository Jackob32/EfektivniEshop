import {reducer as formReducer} from 'redux-form';
//import {reducerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';

const account = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD':
            return {
                data: action.data,
            };
        default:
            return state;
    }
};

const info = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD':
            return {
                data: action.data,
            };
        default:
            return state;
    }
};

const rootReducer=combineReducers({
    account,info,
    form: formReducer,
  //  main: reducer
//    routing: routerReduxer
});

export default rootReducer;
