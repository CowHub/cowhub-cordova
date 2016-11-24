import { combineReducers } from 'redux';

import authentication from './authentication';
import cattle from './cattle';
import login from './login';
import navigation from './navigation'

const reducers = combineReducers({
  authentication,
  cattle,
  login,
  navigation
});

export default reducers;
