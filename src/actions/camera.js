import $ from 'jquery';
import store from '../store/store';


// Pages
export let ACTIVATE_CAMERA = 'ACTIVATE_CAMERA';
export let DEACTIVATE_CAMERA = 'DEACTIVATE_CAMERA';
export let CAPTURE_IMAGE = 'CAPTURE_IMAGE';
export let STORE_IMAGE = 'STORE_IMAGE';
export let ERROR_IMAGE = 'ERROR_IMAGE';





export function activateCamera() {
  ezar.initializeVideoOverlay(
      () => {
        ezar.getBackCamera().start()
      },
      (error) =>  {
        dispatch(errorImage())
      }
  );
  return {
    type: ACTIVATE_CAMERA,
  }
}

export function deactivateCamera() {
  ezar.getBackCamera().stop();
  return {
    type: DEACTIVATE_CAMERA,
  }
}

export function takePhoto() {
  return (dispatch) => {
    dispatch(captureImage());
    ezar.snapshot(
        (base64Image) => {
          dispatch(storeImage(base64Image));
        },
        (error) =>  {
          dispatch(errorImage());
        },
        {
          encodingType: ezar.ImageEncoding.PNG,
          includeWebView: false,
          saveToPhotoAlbum: false
        }
    );
  }
}

export function captureImage() {
  return {
    type: CAPTURE_IMAGE,
  }
}

export function storeImage(base64Image) {
  return {
    type: STORE_IMAGE,
    base64Image,
  }
}

export function errorImage() {
  return {
    type: ERROR_IMAGE
  }
}

// Handle error popups
export let CAMERA_ERROR_SEEN = 'CAMERA_ERROR_SEEN';

export function cameraErrorSeen() {
  return {
    type: CAMERA_ERROR_SEEN,
  }
}