import { combineReducers } from 'redux';

import authentication from './authentication';
import cattle from './cattle';

const reducers = combineReducers({
  authentication,
  cattle,
});

export default reducers;
