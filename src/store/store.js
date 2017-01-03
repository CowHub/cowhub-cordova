// Redux store
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers/index';
const initialState = {};

let middleware = (process.env.NODE_ENV !== 'production')
  ? applyMiddleware(thunk, logger())
  : applyMiddleware(thunk)

const composeEnhancer = (process.env.NODE_ENV !== 'production')
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose

const store = createStore(reducers, initialState, composeEnhancer(middleware));



if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextReducers = require('../reducers/index');
    store.replaceReducer(nextReducers);
    console.clear()
  });
}
export default store;
