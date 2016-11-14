import {
  LOAD_TOKEN,
  STORE_TOKEN,
  REMOVE_TOKEN,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_PENDING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER_PENDING,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
} from '../actions/authentication'

const initialState = {
  token: null,
  fetching: false,
  fetched: false,
  stored: false,
  error: null,
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TOKEN:
      return handleLoadToken(state);
    case STORE_TOKEN:
      return handleStoreToken(state, action.token);
    case REMOVE_TOKEN:
      return handleRemoveToken(state);
    case LOGIN_USER_PENDING:
    case REGISTER_USER_PENDING:
      return handleLoginRegisterUserPending(state);
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return handleLoginRegisterUserSuccess(state);
    case LOGIN_USER_ERROR:
    case REGISTER_USER_ERROR:
      return handleLoginRegisterUserError(state, action.error);
    case LOGOUT_USER_PENDING:
      return state;
    case LOGOUT_USER_SUCCESS:
      return handleLogoutUserSuccess(state);
    case LOGOUT_USER_ERROR:
      return handleLogoutUserError(state, action.error);
    default:
      return state;
  }
};

const handleLoadToken = (state) => {
  // No error as if token doesn't exist, that's an expected behaviour

  const token = (window.localStorage && window.localStorage.auth_token) ? window.localStorage.auth_token : null;
  return {
    ...state,
    token,
    stored: !!(window.localStorage && window.localStorage.auth_token),
    error: null
  };
}

const handleStoreToken = (state, token) => {
  if (window.localStorage) {
    window.localStorage.setItem('auth_token', token);
    return {
      ...state,
      stored: true,
      token: token,
    };
  } else {
    return {
      ...state,
      error: new Error('localStorage not available to store items')
    };
  }
};

const handleRemoveToken = (state) => {
  if (window.localStorage) {
    window.localStorage.removeItem('auth_token');
  }
  return {
    ...state,
    token: null,
    stored: false
  };
}

const handleLoginRegisterUserPending = (state) => {
  return {
    ...state,
    fetching: true,
  };
}

const handleLoginRegisterUserSuccess = (state) => {
  return {
    ...state,
    fetching: false,
    fetched: true,
  };
}

const handleLoginRegisterUserError = (state, error) => {
  return {
    ...state,
    fetching: false,
    error,
  };
}

const handleLogoutUserSuccess = (state) => {
  return {
    ...state
  };
}

const handleLogoutUserError = (state, error) => {
  return {
    ...state,
    error
  };
}

export default authentication;
