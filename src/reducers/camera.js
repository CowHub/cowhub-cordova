import {
    ACTIVATE_CAMERA,
    DEACTIVATE_CAMERA,
    CAPTURE_IMAGE,
    STORE_IMAGE,
    ERROR_IMAGE
} from '../actions/camera'

const initialState = {
  active: false,
  image: null,
  error: false
};



const camera = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE_CAMERA:
      return handleActivateCamera(state);
    case DEACTIVATE_CAMERA:
      return handleDeactivateCamera(state);
    case CAPTURE_IMAGE:
      return handleCaptureImage(state);
    case STORE_IMAGE:
      return handleStoreImage(state,action.base64Image);
    case ERROR_IMAGE:
      return handleErrorImage(state);
    default:
      return state;
  }
};

const handleActivateCamera = (state)  => {
  return {
    ...state,
    active: true
  };
};

const handleDeactivateCamera = (state)  => {
  return {
    ...state,
    active: false,
    error: false
  };
};

const handleCaptureImage = (state)  => {
  return {
    ...state
  };
};

const handleStoreImage = (state,base64Image)  => {
  return {
    ...state,
    image: base64Image,
    error: false
  };
};

const handleErrorImage = (state)  => {
  return {
    ...state,
    error: true
  };
};


export default camera;
