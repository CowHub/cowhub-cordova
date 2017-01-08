import $ from 'jquery';
import store from '../store/store';
import {authenticatedRedirect} from './navigation'

// Token management
export let LOAD_TOKEN = 'LOAD_TOKEN';
export let STORE_TOKEN = 'STORE_TOKEN';
export let REMOVE_TOKEN = 'REMOVE_TOKEN';

export function fetchToken() {
  return {
    type: LOAD_TOKEN,
  }
}

export function storeToken(token) {
  return {
    type: STORE_TOKEN,
    token,
  }
}

export function removeToken() {
  return {
    type: REMOVE_TOKEN,
  }
}

// Login
export let LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
export let LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export let LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

// params: email, password
export function loginUser(params) {
  return (dispatch) => {
    dispatch(loginUserPending());
    $.ajax(`${process.env.API_ENDPOINT}/user/authenticate`, {
      method: 'POST',
      data: params
    }).then((response) => {
      dispatch(storeToken(response.auth_token));
      dispatch(loginUserSuccess());
    }).catch((error) => {
      dispatch(loginUserError(error));
    })
  }
}

export function loginUserPending() {
  return {
    type: LOGIN_USER_PENDING,
  }
}

export function loginUserSuccess() {
  return {
    type: LOGIN_USER_SUCCESS,
  }
}

export function loginUserError(error) {
  return {
    type: LOGIN_USER_ERROR,
    error,
  }
}

// Register
export let REGISTER_USER_PENDING = 'REGISTER_USER_PENDING';
export let REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export let REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

// params: email, password, password_confirmation
export function registerUser(params) {
  return (dispatch) => {
    dispatch(registerUserPending());
    $.ajax(`${process.env.API_ENDPOINT}/user/create`, {
      method: 'POST',
      data: params
    }).then((response) => {
      dispatch(registerUserSuccess());
      dispatch(storeToken(response.auth_token))
    }).catch((error) => {
      dispatch(registerUserError(error))
    })
  }
}

export function registerUserPending() {
  return {
    type: REGISTER_USER_PENDING,
  }
}

export function registerUserSuccess() {
  return {
    type: REGISTER_USER_SUCCESS,
  }
}

export function registerUserError(error) {
  return {
    type: REGISTER_USER_ERROR,
    error,
  }
}

// Logout
export let LOGOUT_USER_PENDING = 'LOGOUT_USER_PENDING';
export let LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export let LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';

export function logoutUser() {
  let token = store.getState().authentication.token;
  const logoutSuccess = (dispatch) => {
    dispatch(logoutUserSuccess());
    dispatch(removeToken());
  };
  return (dispatch) => {
    dispatch(logoutUserPending());
    $.ajax(`${process.env.API_ENDPOINT}/user/unauthenticate`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'DELETE',
    }).then((response) => {
      logoutSuccess(dispatch);
    }).catch((error) => {
      if (error.status === 401) {
        logoutSuccess(dispatch);
      } else {
        dispatch(logoutUserError(error));
      }
    })
  }
}

export function logoutUserPending() {
  return {
    type: LOGOUT_USER_PENDING,
  }
}

export function logoutUserSuccess() {
  return {
    type: LOGOUT_USER_SUCCESS,
  }
}

export function logoutUserError(error) {
  return {
    type: LOGOUT_USER_ERROR,
    error,
  }
}

// Handle error popups
export let LOGIN_ERROR_SEEN = 'LOGIN_ERROR_SEEN';

export function loginErrorSeen() {
  return {
    type: LOGIN_ERROR_SEEN,
  }
}

// Verify token
export let VERIFY_TOKEN_PENDING = 'VERIFY_TOKEN_PENDING';
export let VERIFY_TOKEN_SUCCESS = 'VERIFY_TOKEN_SUCCESS';
export let VERIFY_TOKEN_EXPIRED = 'VERIFY_TOKEN_EXPIRED';
export let VERIFY_TOKEN_ERROR = 'VERIFY_TOKEN_ERROR';

export function verifyToken() {
  return (dispatch) => {
    let token = store.getState().authentication.token;
    dispatch(verifyTokenPending());
    return $.ajax(`${process.env.API_ENDPOINT}/user/validate`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'POST',
    }).then((response) => {
      dispatch(verifyTokenSuccess());
    }).catch((error) => {
      if (error.status === 401) {
        dispatch(tokenExpired());
      } else {
        dispatch(verifyTokenError(error));
      }
    })
  }
}

export function verifyTokenPending() {
  return {
    type: VERIFY_TOKEN_PENDING,
  }
}

export function verifyTokenSuccess() {
  return {
    type: VERIFY_TOKEN_SUCCESS,
  }
}

export function tokenExpired()  {
  return (dispatch) =>  {
    dispatch(removeToken());
    dispatch(verifyTokenExpired());
  }
}

export function verifyTokenExpired()  {
  return {
    type: VERIFY_TOKEN_EXPIRED,
  }
}

export function verifyTokenError(error) {
  return {
    type: VERIFY_TOKEN_ERROR,
    error,
  }
}

export function initialTokenCheck() {
  return (dispatch,getState)  =>  {
    dispatch(fetchToken());
      // Check if we have a token
      if (getState().authentication.token)  {
        // Verify token
        dispatch(verifyToken()).then(() => {
          // Check if valid
          if(getState().authentication.fetched) {
            // Redirect to main app page
            return dispatch(authenticatedRedirect());
          }
          return null;
        });
      }
      return null;
  }
}
