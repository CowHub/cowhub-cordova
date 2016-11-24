import {
    LOGIN_PAGE_LOAD,
    MY_HERD_PAGE_LOAD,
    CREATE_CATTLE_PAGE_LOAD,
    EDIT_CATTLE_PAGE_LOAD,
    IDENTIFY_CATTLE_PAGE_LOAD
} from '../actions/navigation'

const initialState = {
  page: 'LoginPage'
};



const page = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PAGE_LOAD:
      return handleLoginPageLoad(state);
    case MY_HERD_PAGE_LOAD:
      return handleMyHerdPageLoad(state);
    case CREATE_CATTLE_PAGE_LOAD:
      return handleCreateCattlePageLoad(state);
    case EDIT_CATTLE_PAGE_LOAD:
      return handleEditCattlePageLoad(state);
    case IDENTIFY_CATTLE_PAGE_LOAD:
      return handleIdentifyCattlePageLoad(state);
    default:
      return state;
  }
};

const handleLoginPageLoad = (state)  => {
  return {
    ...state,
    page: 'LoginPage'
  };
};

const handleMyHerdPageLoad = (state)  => {
  return {
    ...state,
    page: 'MyHerdPage'
  };
};

const handleCreateCattlePageLoad = (state)  => {
  return {
    ...state,
    page: 'CreateCattlePage'
  };
};

const handleEditCattlePageLoad = (state)  => {
  return {
    ...state,
    page: 'EditCattlePage'
  };
};

const handleIdentifyCattlePageLoad = (state)  => {
  return {
    ...state,
    page: 'IdentifyCattlePage'
  };
};


export default page;
