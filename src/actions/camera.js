import $ from 'jquery';
import store from '../store/store';
import ons from 'onsenui';

// Import Navigation
import {
  cameraStartRedirect,
  cameraVerifyImageRedirect,
  cameraEndRedirect,
  backToCameraRedirect,
} from './navigation';

// Import actions dependant on verified image
import {
  creationOnImageVerified,
  creationOnMuzzleImageVerified
} from './creation';

import {identificationOnImageVerified} from './identification';

// Pages
export let ACTIVATE_CAMERA = 'ACTIVATE_CAMERA';
export let ACTIVATE_CROP_CAMERA = 'ACTIVATE_CROP_CAMERA';
export let DEACTIVATE_CAMERA = 'DEACTIVATE_CAMERA';
export let CAPTURE_IMAGE = 'CAPTURE_IMAGE';
export let STORE_IMAGE = 'STORE_IMAGE';
export let ERROR_IMAGE = 'ERROR_IMAGE';
export let CANCEL_CAMERA = 'CANCEL_CAMERA';
export let IMAGE_VERIFIED = 'IMAGE_VERIFIED';
export let CAMERA_TRY_AGAIN = 'CAMERA_TRY_AGAIN';
export let CROP_STARTED = 'CROP_STARTED';
export let CROP_COMPLETE = ' CROP_COMPLETE';


export function cropImage(base64in) {
  return (dispatch) => {
    dispatch(cropStarted());
    dispatch(creationOnMuzzleImageVerified());
    let cropImg = null;
    if (ons.platform.isWebView()) {
      // create image
      var image = new Image();
      image.src = base64in;
      image.onload = function () {
        //width
        let width = this.width;
        let height = this.height;

        // create an off-screen canvas
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = width * 0.85;
        var ctx = canvas.getContext('2d');
        // draw cropped image
        var sourceX = 0;
        var sourceY = 0.3 * height;
        var sourceWidth = canvas.width;
        var sourceHeight = canvas.height;
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        var destX = 0;
        var destY = 0;

        // draw source image into the off-screen canvas:
        ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
        // encode image to data-uri with base64 version of compressed image
        cropImg = canvas.toDataURL();
        dispatch(cropComplete(cropImg));
        dispatch(identificationOnImageVerified(cropImg));
      }
    } else {
      // Debug code so can be tested in browser
      dispatch(cropComplete(null));
      dispatch(identificationOnImageVerified(null));
    }


  }
}

export function toNextCamera()  {
  return (dispatch) =>  {
    dispatch(backToCameraRedirect()).then(()  =>  {
      dispatch(activateCamera(false));
    });
  }
}

export function startCameraCapture(crop = false) {
  return (dispatch) => {
    dispatch(cameraStartRedirect());
    dispatch(activateCamera(crop));
  }
}

export function restartCameraCapture() {
  return (dispatch) => {
    dispatch(activateCamera());
    dispatch(backToCameraRedirect());
  }
}

export function restartMuzzleCameraCapture() {
  return (dispatch) => {
    dispatch(activateCamera(true));
    dispatch(backToCameraRedirect());
  }
}

export function activateCamera(crop) {
  if (ons.platform.isWebView()) {
    ezar.initializeVideoOverlay(
      () => {
        ezar.getBackCamera().start()
      },
      (error) => {
        dispatch(errorImage())
      }
    );
  }
  if (crop == true) {
    return {
      type: ACTIVATE_CROP_CAMERA
    }
  } else {
    return {
      type: ACTIVATE_CAMERA,
    }
  }
}

export function backFromCamera() {
  return (dispatch) => {
    dispatch(deactivateCamera());
    dispatch(cancelCamera());
    dispatch(cameraEndRedirect());
  }
}

export function backFromVerify() {
  return (dispatch) => {
    // This depends on whether we are capturing a muzzle or a profile image
    let crop = store.getState().camera.crop;
    if (crop == true) {
      dispatch(restartMuzzleCameraCapture());
    } else {
      dispatch(restartCameraCapture());
    }
    dispatch(tryAgain());
  }
}

export function deactivateCamera() {
  if (ons.platform.isWebView()) {
    ezar.getBackCamera().stop();
  }
  return {
    type: DEACTIVATE_CAMERA,
  }
}

export function takePhoto() {
  return (dispatch) => {
    dispatch(snapshot());
    dispatch(deactivateCamera());
    dispatch(captureImage());
    dispatch(cameraVerifyImageRedirect());
  }
}

export function imageConfirmed(img) {
  return (dispatch) => {
    let crop = store.getState().camera.crop;
    if (crop == true) {
      dispatch(cropImage(img));
    } else {
      dispatch(creationOnImageVerified());
      dispatch(imageVerified(img));
    }
  }
}

export function snapshot() {
  return (dispatch) => {
    if (ons.platform.isWebView()) {
      ezar.snapshot(
        (base64Image) => {
          dispatch(storeImage(base64Image));
          cropImage(base64Image);
        },
        (error) => {
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

export function cancelCamera() {
  return {
    type: CANCEL_CAMERA,
  }
}

export function tryAgain() {
  return {
    type: CAMERA_TRY_AGAIN,
  }
}

export function imageVerified(img) {
  return {
    type: IMAGE_VERIFIED,
    img
  }
}

export function cropStarted() {
  return {
    type: CROP_STARTED,
  }
}

export function cropComplete(img) {
  return {
    type: CROP_COMPLETE,
    img
  }
}

// Handle error popups
export let CAMERA_ERROR_SEEN = 'CAMERA_ERROR_SEEN';

export function cameraErrorSeen() {
  return {
    type: CAMERA_ERROR_SEEN,
  }
}
