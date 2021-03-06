import * as ActionTypes from '../actions/userActionTypes';
import { combineReducers } from 'redux'
import { filter, propEq, findIndex } from 'ramda'

const initialState = {
    isLoading: false,
    gists: [],
    error: '',
    currentGist: {
        description: '',
        files: []
    }
}


function isLoading(state = false, action) {
    switch (action.type) {
        case ActionTypes.REQUEST_GIST_ACTION:
            return true

        case ActionTypes.GETALL_SUCCESS:
        case ActionTypes.GETALL_FAILURE:
        case ActionTypes.GETONE_SUCCESS:
        case ActionTypes.GETONE_FAILURE:
        case ActionTypes.CREATE_SUCCESS:
        case ActionTypes.CREATE_FAILURE:
        case ActionTypes.UPDATE_SUCCESS:
        case ActionTypes.UPDATE_FAILURE:
        case ActionTypes.DELETE_SUCCESS:
        case ActionTypes.DELETE_FAILURE: {
            return false
        }
        default: {
            return state
        }
    }
}


function gistsReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case ActionTypes.REQUEST_GIST_ACTION:
            return {
                ...state,
                isLoading: true
            }

        case ActionTypes.GETALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                gists: payload
            };

        case ActionTypes.GETALL_FAILURE:

            return {
                ...state,
                isLoading: false
            }

        case ActionTypes.RESET_GIST:
            return {
                ...state,
                currentGist: {
                    description: '',
                    files: []
                }
            }

        case ActionTypes.GETONE_SUCCESS:
            console.log("Current Gist:", payload)

            return {
                ...state,
                isLoading: false,
                currentGist: payload
            }

        case ActionTypes.GETONE_FAILURE:

            return {
                ...state,
                isLoading: false,
                currentGist: {
                    description: '',
                    files: []
                }
            }

        case ActionTypes.CREATE_SUCCESS:

            state.gists.unshift(payload)

            return {
                ...state,
                gists: state.gists,
                isLoading: false,
            };

        case ActionTypes.CREATE_FAILURE:

            return {
                ...state,
                isLoading: false
            }

        case ActionTypes.UPDATE_SUCCESS:

            const { id } = action.notebook
            let gistIdx = findIndex(propEq('id', id))(state.gists)
            // let gistIdx = state.gists.findIndex(x => x.id === action.notebook.id)
            // console.log('Updated Gist Index : ',gistIdx)
            state.gists[gistIdx] = payload.data

            return {
                ...state,
                gists: state.gists,
                isLoading: false,
                currentGist: action.notebook
            }


        case ActionTypes.UPDATE_FAILURE:

            return {
                ...state,
                isLoading: false
            }

        case ActionTypes.DELETE_SUCCESS:
            let gists = filter(x => x.id !== payload, state.gists)
            // let gists = state.gists.filter(x => x.id !== payload)
            return {
                ...state,
                isLoading: false,
                gists
            };

        case ActionTypes.DELETE_FAILURE:

            if (payload) {
                let gists = filter(x => x.id !== payload, state.gists)
                return {
                    ...state,
                    isLoading: false,
                    gists
                };
            }
            break;

        case 'RE_ORDER_NOTEBOOKS':
            alert(payload.source.droppableId)
            const startIndex = payload.source.index
            const endIndex = payload.destination.index
            const gistIndx = payload.source.droppableId
            const result = Object.values(state.gists[gistIndx]);
            console.log('R', result)
            const [removed] = result.splice(startIndex, 1);
            console.log('Removed', removed)

            state.gists[gistIndx] = result.splice(endIndex, 0, removed);
            console.log(state.gists)
            return {
                ...state,
                gists: state.gists
            }

        case 'MOVE_NOTEBOOKS':

            let sourceIdx = findIndex(propEq('id', payload.source.id))(state.gists)
            let destIdx = findIndex(propEq('id', payload.destination.id))(state.gists)
            state.gists[sourceIdx] = payload.source
            state.gists[destIdx] = payload.destination

            return {
                ...state,
                gists: state.gists
            }

        default:
            return state;
    }
};

export default combineReducers({
    isLoading,
    notebookReducer: gistsReducer
})