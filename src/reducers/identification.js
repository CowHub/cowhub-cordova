import {
  IDENTIFY_CATTLE_CAMERA_INIT,
  IDENTIFY_CATTLE_SUBMIT_REQUEST,
  IDENTIFY_CATTLE_CANCEL,
} from '../actions/identification'
// Import Camera states
import {CANCEL_CAMERA, IMAGE_VERIFIED} from '../actions/camera'
// Import Cattle submit fail
import {MATCH_CATTLE_SUCCESS,MATCH_CATTLE_EXCEPTION,MATCH_CATTLE_ERROR} from '../actions/cattle'

const initialState = {
  identifying: false,
  imageCaptured: false,
  match: null,
  complete: false,
  image: null,
  error: null,
  exception: null
};

const identification = (state = initialState, action) => {
  switch (action.type) {
    case IDENTIFY_CATTLE_CAMERA_INIT:
      return handleIdentifyCameraInit(state);
    case IMAGE_VERIFIED:
      return handleIdentifyCameraCapture(state,action.img);
    case IDENTIFY_CATTLE_SUBMIT_REQUEST:
      return handleIdentifyCattleSubmitRequest(state);
    case MATCH_CATTLE_SUCCESS:
      return handleIdentifyCattleSuccess(state,action.match);
    case MATCH_CATTLE_EXCEPTION:
      return handleIdentifyCattleException(state,action.exception);
    case MATCH_CATTLE_ERROR:
      return handleIdentifyFail(state,action.error);
    case IDENTIFY_CATTLE_CANCEL:
    case CANCEL_CAMERA:
      return handleIdentifyCancel(state);
    default:
      return state;
  }
};

const handleIdentifyCameraInit = (state) => {
  return {
    ...state,
    identifying: true,
  };
};

const handleIdentifyCameraCapture = (state,img) => {
  return {
    ...state,
    imageCaptured: true,
    image: img
  };
};

const handleIdentifyCattleSubmitRequest = (state) => {
  return {
    ...state,
  };
};

const handleIdentifyCattleSuccess = (state, match) => {
  return {
    ...state,
    match: match,
    identifying: false,
    imageCaptured: false,
    complete: false,
  };
};

const handleIdentifyCattleException = (state, exception) => {
  return {
    ...state,
    exception: exception
  };
};

const handleIdentifyFail = (state, error) => {
  return {
    ...state,
    error: error
  };
};

const handleIdentifyCancel = (state) => {
  return {
    ...state,
    identifying: false,
    imageCaptured: false,
    complete: false,
    error: null,
    exception: null
  };
};

export default identification;