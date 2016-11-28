import $ from 'jquery';
import store from '../store/store';

// Pages
export let LOGIN_PAGE_LOAD = 'LOGIN_PAGE_LOAD';
export let MY_HERD_PAGE_LOAD = 'MY_HERD_PAGE_LOAD';
export let BACK_TO_MY_HERD_PAGE = 'BACK_TO_MY_HERD_PAGE';
export let CREATE_CATTLE_PAGE_LOAD = 'CREATE_CATTLE_PAGE_LOAD';
export let EDIT_CATTLE_PAGE_LOAD = 'EDIT_CATTLE_PAGE_LOAD';
export let IDENTIFY_CATTLE_PAGE_LOAD = 'IDENTIFY_CATTLE_PAGE_LOAD';
export let PAGE_RENDERED = 'PAGE_RENDERED';



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

// Edit Cattle Page

export function loadEditCattlePage(){
  return {
    type: EDIT_CATTLE_PAGE_LOAD,
  }
}

// Identify Cattle Page

export function loadIdentifyCattlePage(){
  return {
    type: IDENTIFY_CATTLE_PAGE_LOAD,
  }
}

// Page rendered

export function announcePageRendered(pageName){
  return {
    type: PAGE_RENDERED,
    pageName
  }
}
