export const SOCIAL_LOGIN_SUCCESS = 'social-login-success'
export const SOCIAL_LOGIN_FAILURE = 'social-login-failure'
export const SOCIAL_LOGIN_REQUESTED = 'social-login-requested'

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: []
}

export default (state = {}, action) => {
  switch (action.type) {
    case SOCIAL_LOGIN_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }

    case SOCIAL_LOGIN_FAILURE:
      return {
        ...state,
        isDecrementing: true
      }

    default:
      return state
  }
}

export const handleGithubSuccess = () => {
  return dispatch => {
    dispatch({
      type: SOCIAL_LOGIN_SUCCESS
    })

    dispatch({
      type: SOCIAL_LOGIN_REQUESTED
    })
  }
}

export const handleGithubFailure = () => {
  return dispatch => {
    dispatch({
      type: SOCIAL_LOGIN_SUCCESS
    })

    return setTimeout(() => {
      dispatch({
        type: SOCIAL_LOGIN_REQUESTED
      })
    }, 3000)
  }
}
