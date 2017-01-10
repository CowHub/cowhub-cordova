import $ from 'jquery';
import store from '../store/store';
// Import Camera
import {
  startCameraCapture,
  toNextCamera
} from './camera';

// Import navigation
import {createCattleRedirect,endCreateCattleRedirect} from './navigation';

// States of creation
export let CREATE_CATTLE_MUZZLE_CAMERA_INIT = 'CREATE_CATTLE_MUZZLE_CAMERA_INIT';
export let CREATE_CATTLE_CAMERA_INIT = 'CREATE_CATTLE_CAMERA_INIT';
export let CREATE_CATTLE_ENTER_DETAILS = 'CREATE_CATTLE_ENTER_DETAILS';
export let CREATE_CATTLE_CREATE_SUBMIT = 'CREATE_CATTLE_CREATE_SUBMIT';
export let CREATE_CATTLE_CANCEL = 'CREATE_CATTLE_CANCEL';




// Callback from Camera

export function creationOnMuzzleImageVerified() {
  return (dispatch) =>  {
    if (store.getState().creation.creating) {
      dispatch(startCattleProfileCapture());
    }
  }
}
export function creationOnImageVerified() {
  return (dispatch) =>  {
    if (store.getState().creation.creating) {
      dispatch(createCattleEnterDetails());
      dispatch(createCattleRedirect());
    }
  }
}


export function startCreateCattle() {
  return (dispatch) =>  {
    dispatch(createCattleMuzzleCameraInit());
    dispatch(startCameraCapture(true));
  }
};

export function startCattleProfileCapture() {
  return (dispatch) =>  {
    dispatch(toNextCamera());
  }
};

export function createCattleSuccess()  {
  return (dispatch) =>  {
    dispatch(endCreateCattleRedirect());
  };
}

export function cancelCreate()  {
  return (dispatch) =>  {
    dispatch(createCattleCancel());
    dispatch(endCreateCattleRedirect());
  }
}

export function createCattleMuzzleCameraInit()  {
  return {
    type: CREATE_CATTLE_MUZZLE_CAMERA_INIT
  }
};

export function createCattleCameraInit()  {
  return {
    type: CREATE_CATTLE_CAMERA_INIT
  }
};


export function createCattleEnterDetails()  {
  return {
    type: CREATE_CATTLE_ENTER_DETAILS
  }
};

export function createCattleCreateSubmit()  {
  return {
    type: CREATE_CATTLE_CREATE_SUBMIT
  }
};


export function createCattleCancel()  {
  return {
    type: CREATE_CATTLE_CANCEL
  }
};
