import {
    ACTIVATE_CAMERA,
    ACTIVATE_CROP_CAMERA,
    DEACTIVATE_CAMERA,
    CAPTURE_IMAGE,
    STORE_IMAGE,
    ERROR_IMAGE,
    CAMERA_ERROR_SEEN,
    CAMERA_TRY_AGAIN,
    IMAGE_VERIFIED,
    CANCEL_CAMERA,
    CROP_STARTED,
    CROP_COMPLETE
} from '../actions/camera'

const initialState = {
  active: false,
  image: null,
  error: false,
  crop: false,
  cropping: false,
  message: false
};



const camera = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE_CAMERA:
      return handleActivateCamera(state);
    case ACTIVATE_CROP_CAMERA:
      return handleActivateCropCamera();
    case DEACTIVATE_CAMERA:
      return handleDeactivateCamera(state);
    case CAPTURE_IMAGE:
      return handleCaptureImage(state);
    case STORE_IMAGE:
      return handleStoreImage(state,action.base64Image);
    case ERROR_IMAGE:
      return handleErrorImage(state);
    case CAMERA_ERROR_SEEN:
      return handleErrorSeen(state);
    case CAMERA_TRY_AGAIN:
      return handleTryAgain(state);
    case IMAGE_VERIFIED:
      return handleImageVerified(state,action.img);
    case CROP_STARTED:
      return handleCropStart(state);
    case CROP_COMPLETE:
      return handleCropComplete(state);
    case CANCEL_CAMERA:
      return handleCancelCamera(state);
    default:
      return state;
  }
};

const handleActivateCamera = (state)  => {
  return {
    ...state,
    active: true,
    crop: false,
    message:true
  };
};

const handleActivateCropCamera = (state)  => {
  return {
    ...state,
    active: true,
    crop: true,
    message:true
  };
};

const handleDeactivateCamera = (state)  => {
  return {
    ...state,
    active: false,
    error: false,
  };
};

const handleCaptureImage = (state)  => {
  return {
    ...state,
    message:true
  };
};

const handleStoreImage = (state,base64Image)  => {
  return {
    ...state,
    image: base64Image,
    error: false
  };
};

const handleImageVerified = (state,img)  =>  {
  return {
    ...state,
    crop: false,
    message:false
  };
};

const handleErrorImage = (state)  => {
  return {
    ...state,
    error: true
  };
};

const handleErrorSeen = (state) =>  {
  return {
    ...state,
    error: null,
  }
};

const handleTryAgain = (state) =>  {
  return {
    ...state,
    image: null,
  }
};

const handleCropStart = (state) =>  {
  return {
    ...state,
    cropping: true,
  }
};

const handleCropComplete = (state) =>  {
  return {
    ...state,
    cropping: false,
  }
};

const handleCancelCamera = (state) =>  {
  return {
    ...state,
    message: false
  }
};


export default camera;
