import * as ActionTypes from './UserActionTypes';
import axios from 'axios';

const API_URL = 'https://api.github.com';

export function injectUser(token, user = {}) {


  localStorage.setItem('access_token', JSON.stringify(token)); 
  

  return (dispatch) => {
    dispatch({ type: ActionTypes.REQUEST_USER_ACTION });

    axios({
        url: `${API_URL}/user`,
        method: "GET",
        headers: {
            "Authorization": "token "+token
            }
        })
        .then(payload =>{
            dispatch({ type: ActionTypes.INJECT_SUCCESS, payload })
        })
        .catch(error => dispatch({ type: ActionTypes.INJECT_FAILURE, error }))
}

};

export function logoutUser() {

  localStorage.removeItem('access_token'); 
  localStorage.removeItem('user'); 

  return {
    type: ActionTypes.LOGOUT
  }

};