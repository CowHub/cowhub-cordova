import { combineReducers } from 'redux';

import authentication from './authentication';
import cattle from './cattle';
import login from './login';
import navigation from './navigation'
import camera from './camera'
import creation from './creation'
import identification from './identification'

const reducers = combineReducers({
  authentication,
  cattle,
  login,
  navigation,
  camera,
  creation,
  identification
});

export default reducers;
