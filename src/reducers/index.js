import { combineReducers} from 'redux';
// import auth from './auth.reducer';
import userReducer from "./userReducer";
import gistsReducer from './gistsReducer';
import { reducer as formReducer } from 'redux-form'
import toastrReducer from './toastrReducer'


const rootReducer = combineReducers({
    // auth,
    userReducer,
    gistsReducer,
    toastrReducer,
    form: formReducer

});

export default rootReducer;