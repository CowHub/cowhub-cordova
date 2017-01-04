import {
  CREATE_CATTLE_CAMERA_INIT,
  CREATE_CATTLE_ENTER_DETAILS,
  CREATE_CATTLE_CREATE_SUBMIT,
  CREATE_CATTLE_CANCEL,
} from '../actions/creation'
// Import Camera states
import {CANCEL_CAMERA, IMAGE_VERIFIED} from '../actions/camera'
// Import Cattle submit fail
import {REGISTER_CATTLE_ERROR,REGISTER_CATTLE_SUCCESS} from '../actions/cattle'

const initialState = {
  creating: false,
  imageCaptured: false,
  complete: false,
  image: null,
};

const capture = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CATTLE_CAMERA_INIT:
      return handleCreateCameraInit(state);
    case IMAGE_VERIFIED:
      return handleCreateCameraCapture(state,action.img);
    case CREATE_CATTLE_ENTER_DETAILS:
      return handleCreateEnterDetails(state);
    case REGISTER_CATTLE_SUCCESS:
      return handleCreateSuccess(state);
    case REGISTER_CATTLE_ERROR:
      return handleCreateFail(state);
    case CREATE_CATTLE_CREATE_SUBMIT:
      return handleSubmit(state);
    case CREATE_CATTLE_CANCEL:
    case CANCEL_CAMERA:
      return handleCreateCancel(state);
    default:
      return state;
  }
};

const handleCreateCameraInit = (state) => {
  return {
    ...state,
    creating: true,
  };
};

const handleCreateCameraCapture = (state,img) => {
  return {
    ...state,
    imageCaptured: true,
    image: img
  };
};

const handleCreateEnterDetails = (state) => {
  return {
    ...state,
  };
};

const handleCreateSuccess = (state) => {
  return {
    ...state,
    creating: false,
    imageCaptured: false,
    complete: false,
  };
};

const handleSubmit = (state) => {
  return {
    ...state,
  };
};

const handleCreateFail = (state) => {
  return {
    ...state,
  };
};

const handleCreateCancel = (state) => {
  return {
    ...state,
    creating: false,
    imageCaptured: false,
    complete: false,
  };
};




export default capture;
