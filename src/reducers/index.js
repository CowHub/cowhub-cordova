import { combineReducers } from 'redux';

import authentication from './authentication';
import cattle from './cattle';
import login from './login'

const reducers = combineReducers({
  authentication,
  cattle,
  login
});

export default reducers;
