import { combineReducers } from 'redux';

import authentication from './authentication';
import cattle from './cattle';
import login from './login';
import navigation from './navigation'
import camera from './camera'

const reducers = combineReducers({
  authentication,
  cattle,
  login,
  navigation,
  camera
});

export default reducers;
