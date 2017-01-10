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
  FETCH_CATTLE_IMAGE_PENDING,
  FETCH_CATTLE_IMAGE_SUCCESS,
  FETCH_CATTLE_IMAGE_ERROR,
  UPLOAD_CATTLE_IMAGE_PENDING,
  UPLOAD_CATTLE_IMAGE_SUCCESS,
  UPLOAD_CATTLE_IMAGE_ERROR,
  REQUEST_MATCH_CATTLE_PENDING,
  REQUEST_MATCH_CATTLE_SUCCESS,
  REQUEST_MATCH_CATTLE_ERROR,
  MATCH_CATTLE_PENDING,
  MATCH_CATTLE_SUCCESS,
  MATCH_CATTLE_EXCEPTION,
  MATCH_CATTLE_ERROR,
  CATTLE_ERROR_SEEN,
} from '../actions/cattle';

import {
    SHOW_CATTLE,
    EDITING_CATTLE_ENABLED,
    EDITING_CATTLE_DISABLED,
    END_SHOW_CATTLE
} from '../actions/edit'

const initialState = {
  cattle: [],
  error: null,
  exception: null,
  fetching: false,
  fetched: false,
  editing: false,
  cattlePos: null,
  match_id: null,
  imageFetching: false
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
    case SHOW_CATTLE:
      return handleShow(state, action.id);
    case END_SHOW_CATTLE:
      return handleEndShow(state);
    case EDITING_CATTLE_ENABLED:
      return handleStartEditing(state);
    case EDITING_CATTLE_DISABLED:
      return handleEndEditing(state);
    case FETCH_CATTLE_IMAGE_PENDING:
      return handleFetchCattleImagePending(state, action.id);
    case FETCH_CATTLE_IMAGE_SUCCESS:
      return handleFetchCattleImageSuccess(state, action.id, action.image, action.image_id);
    case FETCH_CATTLE_IMAGE_ERROR:
      return handleFetchCattleImageError(state, action.error);
    case REQUEST_MATCH_CATTLE_PENDING:
      return handleRequestMatchCattlePending(state);
    case REQUEST_MATCH_CATTLE_SUCCESS:
      return handleRequestMatchCattleSuccess(state, action.match_id);
    case REQUEST_MATCH_CATTLE_ERROR:
      return handleRequestMatchCattleError(state, action.error);
    case MATCH_CATTLE_PENDING:
      return handleMatchCattlePending(state);
    case MATCH_CATTLE_SUCCESS:
      return handleMatchCattleSuccess(state);
    case MATCH_CATTLE_EXCEPTION:
      return handleMatchCattleException(state, action.exception);
    case MATCH_CATTLE_ERROR:
      return handleMatchCattleError(state, action.error);
    case CATTLE_ERROR_SEEN:
      return handleErrorSeen(state);
    case UPLOAD_CATTLE_IMAGE_PENDING:
      return handleUploadCattleImagePending(state)
    case UPLOAD_CATTLE_IMAGE_SUCCESS:
      return handleUploadCattleImageSuccess(state, action.id, action.image)
    case UPLOAD_CATTLE_IMAGE_ERROR:
      return handleUploadCattleImageError(state, action.error)
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
  }
  ;

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
    fetching: true,
  };
}

export function handleRegisterCattleSuccess(state, cattleNew) {
  let cattle = state.cattle;
  cattle.push(generateCattleObject(cattleNew))
  return {
    ...state,
    cattle,
    fetching: false,
  };
}

export function handleRegisterCattleError(state, error) {
  return {
    ...state,
    error,
    fetching: false,
  };
}

export function handleUpdateCattlePending(state) {
  return {
    ...state,
    fetching: true,
  };
}

export function handleUpdateCattleSuccess(state, cattleUpdated) {
  let id = cattleUpdated.id;
  let cattle = state.cattle
  let index = cattle.findIndex((c) => {
    return c.cattle.id === id
  });
  cattle[index] = generateCattleObject(cattleUpdated)
  return {
    ...state,
    cattle,
    fetching: false,
    editing: false
  };
}

export function handleUpdateCattleError(state, error) {
  return {
    ...state,
    error,
    fetching: false,
  };
}

export function handleDeleteCattlePending(state) {
  return {
    ...state,
  };
}

export function handleDeleteCattleSuccess(state, id) {
  let cattle = state.cattle.filter((c) => c.cattle.id !== id);
  return {
    ...state,
    cattle,
    cattlePos: null
  };
}

export function handleDeleteCattleError(state, error) {
  return {
    ...state,
    error,
  };
}

export function handleShow(state, id) {
  return {
    ...state,
    cattlePos: id
  };
}

export function handleEndShow(state) {
  return {
    ...state,
    cattlePos: null
  };
}

export function handleStartEditing(state) {
  return {
    ...state,
    editing: true
  };
}

export function handleEndEditing(state) {
  return {
    ...state,
    editing: false,
  };
}

export function handleFetchCattleImagePending(state) {
  return {
    ...state,
    imageFetching: true
  };
}

export function handleFetchCattleImageSuccess(state, id, image, image_id) {
  let cattle = state.cattle
  const index = cattle.findIndex((c) => c.cattle.id === id);
  let img_obj = {
    image_id: image_id,
    data: image
  };
  if (cattle[index].cattle.images)  {
    cattle[index].cattle.images.push(img_obj)
  } else {
    let cattle_imgs = [];
    cattle_imgs.push(img_obj);
    cattle[index].cattle.images = cattle_imgs;
  }
  return {
    ...state,
    cattle,
    imageFetching: false
  }
}

export function handleFetchCattleImageError(state, error) {
  return {
    ...state,
    error,
    imageFetching: false
  };
};

export function handleRequestMatchCattlePending(state) {
  return {
    ...state,
    match_id: null,
  };
}

export function handleRequestMatchCattleSuccess(state, id) {
  return {
    ...state,
    match_id: id,
  };
}

export function handleRequestMatchCattleError(state, error) {
  return {
    ...state,
    error,
  };
}

export function handleMatchCattlePending(state) {
  return {
    ...state,
    fetching: true,
    fetched: false
  };
}

export function handleMatchCattleSuccess(state) {
  return {
    ...state,
    fetching: false,
    fetched: true
  };
}

export function handleMatchCattleException(state, exception) {
  return {
    ...state,
    exception: exception,
    fetching: false,
    fetched: true
  };
}

export function handleMatchCattleError(state, error) {
  return {
    ...state,
    error,
    fetching: false,
    fetched: true
  };
}


export function handleErrorSeen(state) {
  return {
    ...state,
    error: null,
  }
};

export function handleUploadCattleImagePending(state) {
  return {
    ...state,
  }
}

export function handleUploadCattleImageSuccess(state) {
  return {
      ...state
  }
}

export function handleUploadCattleImageError(state, error) {
  return {
    ...state,
    error,
  }
}

export default cattle;
