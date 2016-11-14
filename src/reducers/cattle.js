import {
  FETCH_CATTLE_PENDING,
  FETCH_CATTLE_SUCCESS,
  FETCH_CATTLE_ERROR,
  REGISTER_CATTLE_PENDING,
  REGISTER_CATTLE_SUCCESS,
  REGISTER_CATTLE_ERROR,
  UPDATE_CATTLE_PENDING,
  UPDATE_CATTLE_SUCCESS,
  UPDATE_CATTLE_ERROR,
  DELETE_CATTLE_PENDING,
  DELETE_CATTLE_SUCCESS,
  DELETE_CATTLE_ERROR,
} from '../actions/cattle';

const initialState = {
  cattle: [],
  error: null,
  fetching: false,
  fetched: false,
};

const cattle = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATTLE_PENDING:
      return handleFetchCattlePending(state);
    case FETCH_CATTLE_SUCCESS:
      return handleFetchCattleSuccess(state, action.cattle);
    case FETCH_CATTLE_ERROR:
      return handleFetchCattleError(state, action.error);
    case REGISTER_CATTLE_PENDING:
      return handleRegisterCattlePending(state);
    case REGISTER_CATTLE_SUCCESS:
      return handleRegisterCattleSuccess(state, action.cattle);
    case REGISTER_CATTLE_ERROR:
      return handleRegisterCattleError(state, action.error);
    case UPDATE_CATTLE_PENDING:
      return handleUpdateCattlePending(state);
    case UPDATE_CATTLE_SUCCESS:
      return handleUpdateCattleSuccess(state, action.cattle);
    case UPDATE_CATTLE_ERROR:
      return handleUpdateCattleError(state, action.error);
    case DELETE_CATTLE_PENDING:
      return handleDeleteCattlePending(state);
    case DELETE_CATTLE_SUCCESS:
      return handleDeleteCattleSuccess(state, action.id);
    case DELETE_CATTLE_ERROR:
      return handleDeleteCattleError(state, action.error);
    default:
      return state;
  }
};

export function handleFetchCattlePending(state) {
  return {
    ...state,
    fetching: true,
  };
};

const generateCattleObject = (cattle) => {
  return {
    cattle,
    expanded: false,
  }
};

export function handleFetchCattleSuccess(state, cattleRaw) {
  let cattle = [];
  for (let i in cattleRaw) {
    cattle.push(generateCattleObject(cattleRaw[i]));
  };

  return {
    ...state,
    error: null,
    fetching: false,
    fetched: true,
    cattle
  }
}

export function handleFetchCattleError(state, error) {
  return {
    ...state,
    fetching: false,
    fetched: false,
    error,
  };
};

export function handleRegisterCattlePending(state) {
  return {
    ...state,
  };
}

export function handleRegisterCattleSuccess(state, cattleNew) {
  let cattle = state.cattle;
  cattle.push(generateCattleObject(cattleNew))
  return {
    ...state,
    cattle,
  };
}

export function handleRegisterCattleError(state, error) {
  return {
    ...state,
    error,
  };
}

export function handleUpdateCattlePending(state) {
  return {
    ...state,
  };
}

export function handleUpdateCattleSuccess(state, cattleUpdated) {
  let id = cattleUpdated.id;
  let cattle = state.cattle
  let index = cattle.findIndex( (c) => { return c.cattle.id === id } );
  cattle[index] = generateCattleObject(cattleUpdated)
  return {
    ...state,
    cattle,
  };
}

export function handleUpdateCattleError(state, error) {
  return {
    ...state,
    error,
  };
}

export function handleDeleteCattlePending(state) {
  return {
    ...state,
  };
}

export function handleDeleteCattleSuccess(state, id) {
  let cattle = state.cattle.filter( (c) => c.cattle.id !== id);
  return {
    ...state,
    cattle,
  };
}

export function handleDeleteCattleError(state, error) {
  return {
    ...state,
    error,
  };
}

export default cattle;
