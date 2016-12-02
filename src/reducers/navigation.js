import {
    LOGIN_PAGE_LOAD,
    MY_HERD_PAGE_LOAD,
    BACK_TO_MY_HERD_PAGE,
    CREATE_CATTLE_PAGE_LOAD,
    EDIT_CATTLE_PAGE_LOAD,
    IDENTIFY_CATTLE_PAGE_LOAD,
    VERIFY_IMAGE_PAGE_LOAD,
    PAGE_RENDERED
} from '../actions/navigation'

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
    case EDIT_CATTLE_PAGE_LOAD:
      return handleEditCattlePageLoad(state);
    case IDENTIFY_CATTLE_PAGE_LOAD:
      return handleIdentifyCattlePageLoad(state);
    case VERIFY_IMAGE_PAGE_LOAD:
      return handleVerifyImagePageLoad(state);
    case PAGE_RENDERED:
      return handlePageRendered(state,action.pageName);
    default:
      return state;
  }
};

const handleLoginPageLoad = (state)  => {
  return {
    ...state,
    requestedPage: 'LOGIN_PAGE'
  };
};

const handleMyHerdPageLoad = (state)  => {
  return {
    ...state,
    requestedPage: 'MY_HERD_PAGE'
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
    requestedPage: 'CREATE_CATTLE_PAGE'
  };
};

const handleEditCattlePageLoad = (state)  => {
  return {
    ...state,
    requestedPage: 'EDIT_CATTLE_PAGE'
  };
};

const handleIdentifyCattlePageLoad = (state)  => {
  return {
    ...state,
    requestedPage: 'IDENTIFY_CATTLE_PAGE'
  };
};

const handleVerifyImagePageLoad = (state)  => {
  return {
    ...state,
    requestedPage: 'VERIFY_IMAGE_PAGE'
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
