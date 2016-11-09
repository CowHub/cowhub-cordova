// Redux store
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers/index';
import {
  fetchToken
} from '../actions/index';

const initialState = {};

let middleware = (process.env.NODE_ENV !== 'production')
    ? applyMiddleware(thunk, logger())
    : applyMiddleware(thunk);

const store = createStore(reducers, initialState, middleware);

// Get token if one exists
store.dispatch(fetchToken());

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextReducers = require('../reducers/index');
    store.replaceReducer(nextReducers);
  });
}

export default store;
