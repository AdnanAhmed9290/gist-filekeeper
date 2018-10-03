import * as actionTypes from '../actions/UserActionTypes';

export const STATE_KEY = 'currentUser';

const initialState = {
    isLoading: false,
    gists: [],
    error: '',
    currentGist: {
        description: '',
        files: [{}]
    }
}

export default function gistsReducer(state = initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case actionTypes.REQUEST_GIST_ACTION:
        return {
            ...state,
            isLoading: true
        }

    case actionTypes.GETALL_SUCCESS:
        if(payload) {
            return {
                ...state,
                isLoading: false,
                gists: payload
            };
        }
        else {
            alert('No gists found');
        }
        break;
    
    case actionTypes.GETALL_FAILURE:
        console.log('GET_LISTS_ERROR : ', action.error)
        return {
            ...state,
            isLoading: false
        }

    case actionTypes.RESET_GIST:
        return {
            ...state,
            currentGist: {
                description: '',
                files: [{}]
            }
        }

    case actionTypes.GETONE_SUCCESS:
        if(payload) {
            console.log("Current Gist:",payload)

            return {
                ...state,
                isLoading: false,
                currentGist: payload
            }
        }
        else {
            alert('Not Found')
        }
        break;
    
    case actionTypes.GETONE_FAILURE:
        console.log('GET_SINGLE_LIST_ERROR : ', action.error)
        return {
            ...state,
            isLoading: false
        }

    case actionTypes.CREATE_SUCCESS:
        alert("Gist Successfully Created")     
        if(payload.data) {
            return {
                ...state,
                isLoading: false
            };
        }
        break;

    case actionTypes.CREATE_FAILURE:
        console.error('EDIT_GIST_ERROR : ', action.error)
        return {
            ...state,
            isLoading: false
        }

    case actionTypes.UPDATE_SUCCESS:

        if(payload.data) {
            alert("Gist Successfully Updated")      
            // console.log('=Gists  : ',state.gists)
            // let gistIdx = state.gists.findIndex(x => x.id == action.id)
            // console.log('Updated Gist Index : ',gistIdx)
            // state.gists[gistIdx] = payload.data

            return {
                ...state,
                isLoading: false
            };
        }
        break;

    case actionTypes.UPDATE_FAILURE:
        console.error('EDIT_GIST_ERROR : ', action.error)
        return {
            ...state,
            isLoading: false
        }
    
    case actionTypes.DELETE_SUCCESS:
        if(payload) {
            let gists = state.gists.filter(x => x.id !== payload)
            return {
                ...state,
                isLoading: false,
                gists
            };
        }
        break;
    
    case actionTypes.DELETE_FAILURE:
        console.error('DELETE_GIST_ERROR : ', action.error)
        if(payload) {
            let gists = state.gists.filter(x => x.id !== payload)
            return {
                ...state,
                isLoading: false,
                gists
            };
        }
        break;

    default:
      return state;
  }
};