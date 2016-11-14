import $ from 'jquery';
import store from '../store/store';

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
      dispatch(loginUserSuccess());
      dispatch(storeToken(response.auth_token));
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
