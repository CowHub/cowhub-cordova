import $ from 'jquery';
import store from '../store/store';

import {startCameraCapture} from './camera';
import {requestMatchCattle} from './cattle';
import {identifyCattleRedirect, successIdentifyCattleRedirect, endIdentifyCattleRedirect} from './navigation';

// States of creation
export let IDENTIFY_CATTLE_CAMERA_INIT = 'IDENTIFY_CATTLE_CAMERA_INIT';
export let IDENTIFY_CATTLE_SUBMIT_REQUEST = 'IDENTIFY_CATTLE_SUBMIT_REQUEST';
export let IDENTIFY_CATTLE_CANCEL = 'IDENTIFY_CATTLE_CANCEL';

export function startIdentifyCattle() {
  return (dispatch) => {
    dispatch(identifyCattleCameraInit());
    dispatch(startCameraCapture());
  }
};

// Callback from Camera
export function identificationOnImageVerified(img) {
  return (dispatch) =>  {
    if (store.getState().identification.identifying) {
      dispatch(identifyCattleSubmitRequest());
      dispatch(requestMatchCattle({ data: img }));
      dispatch(identifyCattleRedirect());
    }
  }
}

export function identifyCattleSuccess()  {
  return (dispatch) =>  {
    dispatch(successIdentifyCattleRedirect());
  };
}

export function cancelIdentify()  {
  return (dispatch) =>  {
    dispatch(identifyCattleCancel());
    dispatch(endIdentifyCattleRedirect());
  }
}

export function identifyCattleCameraInit()  {
  return {
    type: IDENTIFY_CATTLE_CAMERA_INIT
  }
};

export function identifyCattleSubmitRequest()  {
  return {
    type: IDENTIFY_CATTLE_SUBMIT_REQUEST
  }
};

export function identifyCattleCancel()  {
  return {
    type: IDENTIFY_CATTLE_CANCEL
  }
};
