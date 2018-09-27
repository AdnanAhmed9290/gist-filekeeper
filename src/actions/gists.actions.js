import * as ActionTypes from './userActionTypes'
import axios from 'axios'

const API_URL = 'https://api.github.com'
// const token = JSON.parse(localStorage.getItem('access_token'));

export function getAllGists() {

    const user = JSON.parse(localStorage.getItem('user'));

    return (dispatch) => {
        dispatch({type: ActionTypes.REQUEST_GIST_ACTION});

        axios({
            url: `${API_URL}/users/${user.login}/gists`,
            method: "GET"
        }).then(payload => {
            dispatch({type: ActionTypes.GETALL_SUCCESS, payload})
        }).catch(error => dispatch({type: ActionTypes.GETALL_FAILURE, error}))
    }

}

export function deleteGist(id) {

    const token = JSON.parse(localStorage.getItem('access_token'));

    return (dispatch) => {
        dispatch({type: ActionTypes.REQUEST_GIST_ACTION});

        axios({
            url: `${API_URL}/gists/${id}`,
            method: "DELETE",
            headers: {
                "Authorization":  `token ${token}`
            }
        }).then(payload => {
            console.log('DEL pAy: ',payload)
            dispatch({type: ActionTypes.DELETE_SUCCESS, payload: id})
        })
        .catch(error => dispatch({type: ActionTypes.DELETE_FAILURE, error, payload: id}))
    }
}

export function createGist(data) {

    const token = JSON.parse(localStorage.getItem('access_token'));

    return (dispatch) => {
        dispatch({type: ActionTypes.REQUEST_GIST_ACTION});

        axios({
            url: `${API_URL}/gists`,
            method: "POST",
            headers: {
                "Authorization":  `token ${token}`
            },
            data
        }).then(payload => {
            dispatch({type: ActionTypes.CREATE_SUCCESS, payload})
            // history.push('/gists')
        }).catch(error => dispatch({type: ActionTypes.CREATE_FAILURE, error}))
    }
}

export function editGist(data, id) {

    const token = JSON.parse(localStorage.getItem('access_token'));

    console.log(data)

    return (dispatch) => {
        dispatch({type: ActionTypes.REQUEST_GIST_ACTION});

        axios({
            url: `${API_URL}/gists/${id}`,
            method: "PATCH",
            headers: {
                "Authorization":  `token ${token}`
            },
            data
        }).then(payload => {
            dispatch({type: ActionTypes.UPDATE_SUCCESS, payload, id})
            // history.push('/gists')
        }).catch(error => dispatch({type: ActionTypes.UPDATE_FAILURE, error}))
    }
}