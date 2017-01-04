import {
    LOGIN_PAGE_LOAD,
    MY_HERD_PAGE_LOAD,
    BACK_TO_MY_HERD_PAGE,
    CREATE_CATTLE_PAGE_LOAD,
    CREATE_CAMERA_CAPTURE_PAGE_LOAD,
    BACK_TO_CAMERA_CAPTURE_PAGE,
    EDIT_CATTLE_PAGE_LOAD,
    VERIFY_IMAGE_PAGE_LOAD,
    PAGE_RENDERED
} from '../actions/navigation'

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
    LOGIN_ERROR_SEEN,
} from '../actions/authentication'

const initialState = {
  requestedPage: 'LOGIN_PAGE',
  renderedPage: 'LOGIN_PAGE',
  props: {key: 'LOGIN_PAGE'},
  back: false,
};



const page = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PAGE_LOAD:
      return handleLoginPageLoad(state);
    case MY_HERD_PAGE_LOAD:
      return handleMyHerdPageLoad(state);
    case BACK_TO_MY_HERD_PAGE:
      return handleBackToMyHerdPageLoad(state);
    case CREATE_CATTLE_PAGE_LOAD:
      return handleCreateCattlePageLoad(state);
    case CREATE_CAMERA_CAPTURE_PAGE_LOAD:
      return handleCameraCapture(state);
    case BACK_TO_CAMERA_CAPTURE_PAGE:
      return handleBackToCameraCapture(state);
    case EDIT_CATTLE_PAGE_LOAD:
      return handleEditCattlePageLoad(state);
    case VERIFY_IMAGE_PAGE_LOAD:
      return handleVerifyImagePageLoad(state);
    case PAGE_RENDERED:
      return handlePageRendered(state,action.pageName);
    case LOGIN_USER_SUCCESS:
      return handleMyHerdPageLoad(state);
    case LOGOUT_USER_SUCCESS:
      return handleLoginPageLoad(state);
    default:
      return state;
  }
};

const handleLoginPageLoad = (state)  => {
  return {
    ...state,
    requestedPage: 'LOGIN_PAGE',
    back: false
  };
};

const handleMyHerdPageLoad = (state)  => {
  return {
    ...state,
    requestedPage: 'MY_HERD_PAGE',
    back: false
  };
};

const handleBackToMyHerdPageLoad = (state)  => {
  return {
    ...state,
    requestedPage: 'MY_HERD_PAGE',
    back: true,
  };
};

const handleCreateCattlePageLoad = (state)  => {
  return {
    ...state,
    requestedPage: 'CREATE_CATTLE_PAGE',
    back: false
  };
};

const handleCameraCapture = (state)  => {
  return {
    ...state,
    requestedPage: 'CAMERA_CAPTURE_PAGE',
    back: false
  };
};

const handleBackToCameraCapture = (state)  => {
  return {
    ...state,
    requestedPage: 'CAMERA_CAPTURE_PAGE',
    back: true
  };
};


const handleEditCattlePageLoad = (state)  => {
  return {
    ...state,
    requestedPage: 'EDIT_CATTLE_PAGE',
    back: false
  };
};
const handleVerifyImagePageLoad = (state)  => {
  return {
    ...state,
    requestedPage: 'VERIFY_IMAGE_PAGE',
    back: false
  };
};

const handlePageRendered = (state,pageName)  => {
  return {
    ...state,
    renderedPage: pageName,
    back: false
  };
};



export default page;
