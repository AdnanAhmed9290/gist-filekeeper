import { combineReducers} from 'redux';
// import auth from './auth.reducer';
import userReducer from "./user.reducer";
import gistsReducer from './gists.reducer';
import { routerReducer } from 'react-router-redux'

// import {reducer} from 'react-redux-oauth2'

const rootReducer = combineReducers({
    // auth,
    userReducer,
    gistsReducer,
    routing: routerReducer
    // oauth: reducer
});

export default rootReducer;