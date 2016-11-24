import $ from 'jquery';
import store from '../store/store';

// Pages
export let LOGIN_PAGE_LOAD = 'LOGIN_PAGE_LOAD';
export let MY_HERD_PAGE_LOAD = 'MY_HERD_PAGE_LOAD';
export let CREATE_CATTLE_PAGE_LOAD = 'CREATE_CATTLE_PAGE_LOAD';
export let EDIT_CATTLE_PAGE_LOAD = 'EDIT_CATTLE_PAGE_LOAD';
export let IDENTIFY_CATTLE_PAGE_LOAD = 'IDENTIFY_CATTLE_PAGE_LOAD';



// Login Page

export function loadLoginPage(){
  return {
    type: LOGIN_PAGE_LOAD
  }
}

// My Herd Page

export function loadMyHerdPage(){
  return {
    type: MY_HERD_PAGE_LOAD
  }
}

// Create Cattle Page

export function loadCreateCattlePage(){
  return {
    type: CREATE_CATTLE_PAGE_LOAD
  }
}

// Edit Cattle Page

export function loadEditCattlePage(){
  return {
    type: EDIT_CATTLE_PAGE_LOAD
  }
}

// Identify Cattle Page

export function loadIdentifyCattlePage(){
  return {
    type: IDENTIFY_CATTLE_PAGE_LOAD
  }
}


