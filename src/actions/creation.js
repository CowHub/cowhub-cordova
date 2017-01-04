import $ from 'jquery';
import store from '../store/store';

// States of creation
export let CREATE_CATTLE_CAMERA_INIT = 'CREATE_CATTLE_CAMERA_INIT';
export let CREATE_CATTLE_CAMERA_CAPTURE = 'CREATE_CATTLE_CAMERA_CAPTURE';
export let CREATE_CATTLE_ENTER_DETAILS = 'CREATE_CATTLE_ENTER_DETAILS';
export let CREATE_CATTLE_CREATE_SUCCESS = 'CREATE_CATTLE_CREATE_SUCCESS';
export let CREATE_CATTLE_CREATE_FAIL = 'CREATE_CATTLE_CREATE_FAIL';
export let CREATE_CATTLE_CANCEL = 'CREATE_CATTLE_CANCEL';



export function createCattleCameraInit()  {
  return {
    type: CREATE_CATTLE_CAMERA_INIT
  }
};

export function createCattleCameraCapture()  {
  return {
    type: CREATE_CATTLE_CAMERA_CAPTURE
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