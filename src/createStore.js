
// libs
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import rootReducer from './reducers';

import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';

const history = createBrowserHistory()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = createLogger({
  collapsed: true
})

const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(
      reduxThunk, logger,
      routerMiddleware(history),
    ),
  ),
)


export { store, history }