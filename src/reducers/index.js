import { combineReducers} from 'redux';
// import auth from './auth.reducer';
import userReducer from "./UserReducer";
import gistsReducer from './GistsReducer';
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

// import {reducer} from 'react-redux-oauth2'

const rootReducer = combineReducers({
    // auth,
    userReducer,
    gistsReducer,
    routing: routerReducer,
    form: formReducer
    // oauth: reducer
});

export default rootReducer;