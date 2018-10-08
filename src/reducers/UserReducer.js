import * as actionTypes from '../actions/userActionTypes';

export const STATE_KEY = 'currentUser';

const user = JSON.parse(localStorage.getItem('user'))

const initialState = user ? {
        isAuthenticated: true,
        user: user,
        isLoading: false
    } : {
        isAuthenticated: false,
        user: {},
        isLoading: false
    };

export default function userReducer(state = initialState, action) {
  const {type, payload} = action;

  switch(type) {

    case actionTypes.REQUEST_USER_ACTION:
        return { isLoading: true }

    case actionTypes.INJECT_SUCCESS:
    
        if(payload.data) {
            localStorage.setItem('user', JSON.stringify(payload.data)); 
            return {
                ...state,
                isAuthenticated: true,
                user: payload.data,
                isLoading: false
            };
        }
    break;

    case actionTypes.INJECT_FAILURE:
        return {
            ...state,
            isAuthenticated: false,
            user: {},
            isLoading: false
        };

    case actionTypes.LOGOUT:
      return {
        isAuthenticated: false,
        user: {}
      }

    default:
      return state;
  }
};