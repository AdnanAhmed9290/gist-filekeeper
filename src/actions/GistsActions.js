import * as ActionTypes from './userActionTypes'
import axios from 'axios'

const API_URL = 'https://api.github.com'


export function getAllGists() {

    const user = JSON.parse(localStorage.getItem('user'));

    return (dispatch) => {

        dispatch({ type: ActionTypes.REQUEST_GIST_ACTION });

        fetch(`${API_URL}/users/${user.login}/gists`)
            .then(results => {
                return results.json()
            })
            .then(data => {
                // console.log(data)
                dispatch({ type: ActionTypes.GETALL_SUCCESS, payload: data })
            }).catch(error => {
                dispatch({ type: ActionTypes.TOAST_DASH_MESSAGE, payload: 'Failed to fetch notebooks!', variant: 'error' })
                console.log(error)
                dispatch({ type: ActionTypes.GETALL_FAILURE })
            })

    }

}

export function resetCurrentGist() {
    return {
        type: ActionTypes.RESET_GIST
    }
}

export function getSingleGist(id) {

    return (dispatch) => {

        dispatch({ type: ActionTypes.REQUEST_GIST_ACTION });
        fetch(`https://api.github.com/gists/${id}`)
            .then(results => {
                return results.json()
            })
            .then(data => {
                // console.log(data)
                let notebook = {
                    id: data.id,
                    description: data.description,
                    owner: data.owner.login,
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                    files: []
                }
                Object.values(data.files).map((f, index) => {
                    notebook.files.push({ name: f.filename, content: f.content, raw_url: f.raw_url })
                    return 1
                })

                dispatch({ type: ActionTypes.GETONE_SUCCESS, payload: notebook })

            }).catch(error => {
                dispatch({ type: ActionTypes.TOAST_DASH_MESSAGE, payload: "Invalid ID.. Notebook doesn't exists", variant: 'error' })
                console.log(error)
                dispatch({ type: ActionTypes.GETONE_FAILURE })
            })
    }
}

export function deleteGist(id) {

    const token = JSON.parse(localStorage.getItem('access_token'));

    return (dispatch) => {
        dispatch({ type: ActionTypes.REQUEST_GIST_ACTION });

        axios({
            url: `${API_URL}/gists/${id}`,
            method: "DELETE",
            headers: {
                "Authorization": `token ${token}`
            }
        }).then(payload => {
            dispatch({ type: ActionTypes.DELETE_SUCCESS, payload: id })
            dispatch({ type: ActionTypes.TOAST_DASH_MESSAGE, payload: 'Notebook Deleted Successfully', variant: 'success' })

        })
            .catch(error => {
                dispatch({ type: ActionTypes.TOAST_DASH_MESSAGE, payload: 'Delete Notebook Request Failed!', variant: 'error' })
                console.log(error)
                dispatch({ type: ActionTypes.DELETE_FAILURE, error, payload: id })
            })
    }
}

export function createGist(data) {

    const token = JSON.parse(localStorage.getItem('access_token'))

    return (dispatch) => {
        dispatch({ type: ActionTypes.REQUEST_GIST_ACTION })

        axios({
            url: `${API_URL}/gists`,
            method: "POST",
            headers: {
                "Authorization": `token ${token}`
            },
            data
        }).then(payload => {

            dispatch({ type: ActionTypes.CREATE_SUCCESS, payload: payload.data })
            dispatch({ type: ActionTypes.TOAST_DASH_MESSAGE, payload: 'Notebook Created Successfully', variant: 'success' })
        }).catch(error => {
            dispatch({ type: ActionTypes.TOAST_DASH_MESSAGE, payload: 'Create Notebook Request Failed!', variant: 'error' })
            console.log(error)
            dispatch({ type: ActionTypes.CREATE_FAILURE, error })
        })
    }
}

export function editGist(data, id, message) {

    const token = JSON.parse(localStorage.getItem('access_token'));
    console.log("updated data",data)

    return (dispatch) => {
        dispatch({ type: ActionTypes.REQUEST_GIST_ACTION });

        axios({
            url: `${API_URL}/gists/${id}`,
            method: "PATCH",
            headers: {
                "Authorization": `token ${token}`
            },
            data
        }).then(payload => {
            const { data } = payload
            let notebook = {
                id: data.id,
                description: data.description,
                owner: data.owner.login,
                created_at: data.created_at,
                updated_at: data.updated_at,
                files: []
            }
            Object.values(data.files).map((f, index) => {

                notebook.files.push({ name: f.filename, content: f.content, raw_url: f.raw_url })
                return 1
            })

            dispatch({ type: ActionTypes.UPDATE_SUCCESS, payload, notebook })
            dispatch({ type: ActionTypes.TOAST_DASH_MESSAGE, payload: message, variant: 'success' })


        }).catch(error => {
            dispatch({ type: ActionTypes.TOAST_DASH_MESSAGE, payload: 'Update Notebook Request Failed!', variant: 'error' })
            console.log(error)
            dispatch({ type: ActionTypes.UPDATE_FAILURE, error })
        })
    }
}

export function moveNotebook(source, destination, fileName) {

    const token = JSON.parse(localStorage.getItem('access_token'));

   
    let sourceData = {
        "description": source.description,
        "files": {}
    }

    sourceData.files[fileName] = null

    let destData = {
        "description": destination.description,
        "files": {}
    }

    destData.files[fileName] = { "content" : 'Sample Content'}

    console.log("Source , Destination ",sourceData, destData)

    return (dispatch) => {

        dispatch({
            type: 'MOVE_NOTEBOOKS',
            payload: { source, destination }
        })
    
        axios({
            url: `${API_URL}/gists/${source.id}`,
            method: "PATCH",
            headers: {
                "Authorization": `token ${token}`
            },
            data: sourceData
        })
            .then(resp => {
                console.log('First request is successfull')

                axios({
                    url: `${API_URL}/gists/${destination.id}`,
                    method: "PATCH",
                    headers: {
                        "Authorization": `token ${token}`
                    },
                    data: destData
                })
                .then(resp => {
                    console.log('Data : ', resp.data)
                    dispatch({
                        type: 'MOVE_NOTEBOOKS',
                        payload: { source, destination }
                    })
                    dispatch({ type: ActionTypes.TOAST_DASH_MESSAGE, payload: "Note moved successfully!", variant: 'info' })

                })
                .catch(error => {

                    dispatch({ type: ActionTypes.TOAST_DASH_MESSAGE, payload: 'Note destination not found', variant: 'error' })
                    console.log(error)
                    dispatch({ type: ActionTypes.UPDATE_FAILURE, error })
    
                })
            })
            .catch(error => {

                dispatch({ type: ActionTypes.TOAST_DASH_MESSAGE, payload: "Can't perform this action", variant: 'error' })
                console.log(error)
                dispatch({ type: ActionTypes.UPDATE_FAILURE, error })

            })
    }
}

export function reOrderNotebooks(result) {
    return (dispatch) => {
        dispatch({
            type: 'RE_ORDER_NOTEBOOKS',
            payload: result
        })
    }
}