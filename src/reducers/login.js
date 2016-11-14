import {
    EMAIL_MODIFIED,
    PASSWORD_MODIFIED,
    SUBMIT_PRESSED
} from '../actions/login'

const initialState = {
  email: null,
  password: null
};

// This should allow us to introduce client-side validation later !

const login = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_MODIFIED:
      return handleEmailModified(state, action.email);
    case PASSWORD_MODIFIED:
      return handlePasswordModified(state, action.password);
    case SUBMIT_PRESSED:
      return handleSubmit(state);

    default:
      return state;
  }
};

const handleEmailModified = (state, email) => {
  // Set email field
  return {
    ...state,
    email: email
  };
};

const handlePasswordModified = (state, password) => {
  // Set password field
  return {
    ...state,
    password: password
  };
};

const handleSubmit = (state) => {
  // Clear password
  return {
    ...state,
    password: null
  };
};


export default login;
