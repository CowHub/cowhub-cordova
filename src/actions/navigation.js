import $ from 'jquery';
import store from '../store/store';

// Pages
export let LOGIN_PAGE_LOAD = 'LOGIN_PAGE_LOAD';
export let MY_HERD_PAGE_LOAD = 'MY_HERD_PAGE_LOAD';
export let BACK_TO_MY_HERD_PAGE = 'BACK_TO_MY_HERD_PAGE';
export let CREATE_CATTLE_PAGE_LOAD = 'CREATE_CATTLE_PAGE_LOAD';
export let CREATE_CAMERA_CAPTURE_PAGE_LOAD = 'CREATE_CAMERA_CAPTURE_PAGE_LOAD';
export let BACK_TO_CAMERA_CAPTURE_PAGE = 'BACK_TO_CAMERA_CAPTURE_PAGE';
export let EDIT_CATTLE_PAGE_LOAD = 'EDIT_CATTLE_PAGE_LOAD';
export let IDENTIFY_CATTLE_WAITING_PAGE_LOAD = 'IDENTIFY_CATTLE_WAITING_PAGE_LOAD';
export let IDENTIFY_CATTLE_SUCCESS_PAGE_LOAD = 'IDENTIFY_CATTLE_SUCCESS_PAGE_LOAD';
export let VERIFY_IMAGE_PAGE_LOAD = 'VERIFY_IMAGE_PAGE_LOAD';
export let PAGE_RENDERED = 'PAGE_RENDERED';

// Redirects

export function authenticatedRedirect() {
  return(dispatch) => {
    dispatch(loadMyHerdPage());
  }
}

export function cattleEditingRedirect() {
  return(dispatch)  =>  {
    dispatch(loadEditCattlePage());
  }
}

export function cattlePostEditingRedirect() {
  return(dispatch)  =>  {
    dispatch(backToMyHerdPage());
  }
}

export function cameraStartRedirect() {
  return(dispatch)  =>  {
    dispatch(loadCameraCapturePage());
  }
}

export function cameraEndRedirect() {
  return(dispatch)  =>  {
    dispatch(loadMyHerdPage());
  }
}

export function cameraVerifyImageRedirect() {
  return(dispatch)  =>  {
    dispatch(loadVerifyImagePage());
  }
}

export function backToCameraRedirect()  {
  return(dispatch)  =>  {
    dispatch(backToCameraCapturePage());
    return Promise.resolve();
  }
}

export function createCattleRedirect()  {
  return(dispatch)  =>  {
    dispatch(loadCreateCattlePage());
  }
}

export function endCreateCattleRedirect()  {
  return(dispatch)  =>  {
    dispatch(loadMyHerdPage());
  }
}

export function identifyCattleRedirect()  {
  return(dispatch)  =>  {
    dispatch(loadIdentifyCattleWaitingPage());
  }
}

export function successIdentifyCattleRedirect()  {
  return(dispatch)  =>  {
    dispatch(loadIdentifyCattleSuccessPage());
  }
}

export function endIdentifyCattleRedirect()  {
  return(dispatch)  =>  {
    dispatch(loadMyHerdPage());
  }
}

// Login Page

export function loadLoginPage(){
  return {
    type: LOGIN_PAGE_LOAD,
  }
}

// My Herd Page

export function loadMyHerdPage(){
  return {
    type: MY_HERD_PAGE_LOAD,
  }
}

export function backToMyHerdPage(){
  return {
    type: BACK_TO_MY_HERD_PAGE,
  }
}

// Create Cattle Page

export function loadCreateCattlePage(){
  return {
    type: CREATE_CATTLE_PAGE_LOAD,
  }
}

// Create Camera Photo

export function loadCameraCapturePage(){
  return {
    type: CREATE_CAMERA_CAPTURE_PAGE_LOAD,
  }
}

// Create Camera Photo

export function backToCameraCapturePage(){
  return {
    type: BACK_TO_CAMERA_CAPTURE_PAGE,
  }
}

// Edit Cattle Page

export function loadEditCattlePage(){
  return {
    type: EDIT_CATTLE_PAGE_LOAD,
  }
}


// Identify Cattle Page

export function loadIdentifyCattleWaitingPage(){
  return {
    type: IDENTIFY_CATTLE_WAITING_PAGE_LOAD,
  }
}

export function loadIdentifyCattleSuccessPage(){
  return {
    type: IDENTIFY_CATTLE_SUCCESS_PAGE_LOAD,
  }
}


// Verify Image Page

export function loadVerifyImagePage(){
  return {
    type: VERIFY_IMAGE_PAGE_LOAD,
  }
}


// Page rendered

export function announcePageRendered(pageName){
  return {
    type: PAGE_RENDERED,
    pageName
  }
}
