// libs

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

// src
import { store, history } from "./createStore";
import { App } from "./components";

ReactDOM.render(
  <Provider store={store}>
      <App history={history}/>
  </Provider>, 
  document.getElementById('root'));

  