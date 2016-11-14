import $ from 'jquery';
import store from '../store/store';

// Detail management
export let EMAIL_MODIFIED = 'EMAIL_MODIFIED';
export let PASSWORD_MODIFIED = 'PASSWORD_MODIFIED';
export let SUBMIT_PRESSED = 'SUBMIT_PRESSED'



// email
export function enterEmail(email){
  return {
    type: EMAIL_MODIFIED,
    email
  }
}

// password
export function enterPassword(password){
  return {
    type: PASSWORD_MODIFIED,
    password
  }
}
// Submit
export function submitPressed(){
  return {
    type: SUBMIT_PRESSED,
  }
}


