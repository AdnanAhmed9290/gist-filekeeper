import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import './index.css';
import { syncHistoryWithStore } from 'react-router-redux'


import App from './components/App';
import rootReducer from './reducers';

import ReduxPromise from 'redux-promise';

const logger = createLogger({
    collapsed: true
})


// create the store with dummy reducer and emptystate
const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk, logger, ReduxPromise));

ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>, 
  document.getElementById('root'));

  