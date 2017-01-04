import $ from 'jquery';
import store from '../store/store';

// Pages
export let LOGIN_PAGE_LOAD = 'LOGIN_PAGE_LOAD';
export let MY_HERD_PAGE_LOAD = 'MY_HERD_PAGE_LOAD';
export let BACK_TO_MY_HERD_PAGE = 'BACK_TO_MY_HERD_PAGE';
export let CREATE_CATTLE_PAGE_LOAD = 'CREATE_CATTLE_PAGE_LOAD';
export let CREATE_CAMERA_CAPTURE_PAGE_LOAD = 'CREATE_CAMERA_CAPTURE_PAGE_LOAD';
export let EDIT_CATTLE_PAGE_LOAD = 'EDIT_CATTLE_PAGE_LOAD';
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

// Edit Cattle Page

export function loadEditCattlePage(){
  return {
    type: EDIT_CATTLE_PAGE_LOAD,
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
