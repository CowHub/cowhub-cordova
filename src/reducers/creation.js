import {
  CREATE_CATTLE_CAMERA_INIT,
  CREATE_CATTLE_CAMERA_CAPTURE,
  CREATE_CATTLE_ENTER_DETAILS,
  CREATE_CATTLE_CREATE_SUCCESS,
  CREATE_CATTLE_CREATE_FAIL,
  CREATE_CATTLE_CANCEL,
} from '../actions/creation'

const initialState = {
  creating: false,
  imageCaptured: false,
  complete: false,
};

const capture = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CATTLE_CAMERA_INIT:
      return handleCreateCameraInit(state);
    case CREATE_CATTLE_CAMERA_CAPTURE:
      return handleCreateCameraCapture(state);
    case CREATE_CATTLE_ENTER_DETAILS:
      return handleCreateEnterDetails(state);
    case CREATE_CATTLE_CREATE_SUCCESS:
      return handleCreateSuccess(state);
    case CREATE_CATTLE_CREATE_FAIL:
      return handleCreateFail(state);
    case CREATE_CATTLE_CANCEL:
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

const handleCreateCameraCapture = (state) => {
  return {
    ...state,
    imageCaptured: true,
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
