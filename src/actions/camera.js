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
import {creationOnImageVerified} from './creation';
import {identificationOnImageVerified} from './identification';

// Pages
export let ACTIVATE_CAMERA = 'ACTIVATE_CAMERA';
export let DEACTIVATE_CAMERA = 'DEACTIVATE_CAMERA';
export let CAPTURE_IMAGE = 'CAPTURE_IMAGE';
export let STORE_IMAGE = 'STORE_IMAGE';
export let ERROR_IMAGE = 'ERROR_IMAGE';
export let CANCEL_CAMERA = 'CANCEL_CAMERA';
export let IMAGE_VERIFIED = 'IMAGE_VERIFIED';
export let CAMERA_TRY_AGAIN = 'CAMERA_TRY_AGAIN';

export function cropImage(base64in) {
  // create image
  var image = new Image();
  image.src = base64in;
  image.onload = function() {
    //width
    let width = this.width;
    let height = this.height;

    // create an off-screen canvas
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = width;
    var ctx = canvas.getContext('2d');
    // draw cropped image
    var sourceX = 0;
    var sourceY = 0.2 * height;
    var sourceWidth = width;
    var sourceHeight = width;
    var destWidth = sourceWidth;
    var destHeight = sourceHeight;
    var destX = 0;
    var destY = 0;

    // draw source image into the off-screen canvas:
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    // encode image to data-uri with base64 version of compressed image
    console.log(canvas.toDataURL());
  }
}

export function startCameraCapture()  {
  return (dispatch) =>  {
    if (ons.platform.isWebView()) {
      dispatch(activateCamera());
    }
    dispatch(cameraStartRedirect());
  }
}

export function restartCameraCapture()  {
  return (dispatch) =>  {
    if (ons.platform.isWebView()) {
      dispatch(activateCamera());
    }
    dispatch(backToCameraRedirect());
  }
}

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

export function backFromCamera()  {
  return (dispatch) =>  {
    if (ons.platform.isWebView()) {
      dispatch(deactivateCamera());
    }
    dispatch(cancelCamera());
    dispatch(cameraEndRedirect());
  }
}

export function backFromVerify()  {
  return (dispatch) => {
    dispatch(restartCameraCapture());
    dispatch(tryAgain());
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
    if (ons.platform.isWebView()) {
      dispatch(snapshot());
      dispatch(deactivateCamera());
    }
    dispatch(captureImage());
    dispatch(cameraVerifyImageRedirect());
  }
}

export function imageConfirmed(img)  {
  return (dispatch) =>  {
    dispatch(imageVerified(img));
    dispatch(creationOnImageVerified());
    dispatch(identificationOnImageVerified(img));
  }
}

export function snapshot()  {
  return (dispatch) =>  {
    ezar.snapshot(
        (base64Image) => {
          dispatch(storeImage(base64Image));
          cropImage(base64Image);
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

export function cancelCamera()  {
  return {
    type: CANCEL_CAMERA,
  }
}

export function tryAgain()  {
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

// Handle error popups
export let CAMERA_ERROR_SEEN = 'CAMERA_ERROR_SEEN';

export function cameraErrorSeen() {
  return {
    type: CAMERA_ERROR_SEEN,
  }
}
