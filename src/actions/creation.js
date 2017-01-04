import $ from 'jquery';
import store from '../store/store';
// Import Camera
import {startCameraCapture} from './camera';

// Import navigation
import {createCattleRedirect} from './navigation';

// States of creation
export let CREATE_CATTLE_CAMERA_INIT = 'CREATE_CATTLE_CAMERA_INIT';
export let CREATE_CATTLE_ENTER_DETAILS = 'CREATE_CATTLE_ENTER_DETAILS';
export let CREATE_CATTLE_CREATE_SUCCESS = 'CREATE_CATTLE_CREATE_SUCCESS';
export let CREATE_CATTLE_CREATE_FAIL = 'CREATE_CATTLE_CREATE_FAIL';
export let CREATE_CATTLE_CANCEL = 'CREATE_CATTLE_CANCEL';

// Callback from Camera
export function creationOnImageVerified() {
  return (dispatch) =>  {
    dispatch(createCattleEnterDetails());
    dispatch(createCattleRedirect());
  }
}


export function startCreateCattle() {
  return (dispatch) =>  {
    dispatch(createCattleCameraInit());
    dispatch(startCameraCapture());
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

export function createCattleCreateSuccess()  {
  return {
    type: CREATE_CATTLE_CREATE_SUCCESS
  }
};

export function createCattleCreateFail()  {
  return {
    type: CREATE_CATTLE_CREATE_FAIL
  }
};

export function createCattleCancel()  {
  return {
    type: CREATE_CATTLE_CANCEL
  }
};