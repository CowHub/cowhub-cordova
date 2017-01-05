import $ from 'jquery';
import store from '../store/store';
import {
    cattleEditingRedirect,
    cattlePostEditingRedirect
} from './navigation';

import {createCattleSuccess} from './creation';
import {identifyCattleSuccess} from './identification';

// Cattle fetch
export let FETCH_CATTLE_PENDING = 'FETCH_CATTLE_PENDING';
export let FETCH_CATTLE_SUCCESS = 'FETCH_CATTLE_SUCCESS';
export let FETCH_CATTLE_ERROR = 'FETCH_CATTLE_ERROR';

export function fetchCattle() {
  let token = store.getState().authentication.token;
  return (dispatch) => {
    dispatch(fetchCattlePending());
    $.ajax(`${process.env.API_ENDPOINT}/cattle`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      method: 'GET'
    }).then((response) => {
      dispatch(fetchCattleSuccess(response.cattle));
      for (let cattle of response.cattle) {
        dispatch(fetchCattleImage(cattle.id))
      }
    }).catch((error) => {
      dispatch(fetchCattleError(error));
    })
  };
};

export function fetchCattlePending() {
  return {
    type: FETCH_CATTLE_PENDING,
  };
};

export function fetchCattleSuccess(cattle) {
  return {
    type: FETCH_CATTLE_SUCCESS,
    cattle,
  };
};

export function fetchCattleError(error) {
  return {
    type: FETCH_CATTLE_ERROR,
    error,
  };
};

// Cattle register
export let REGISTER_CATTLE_PENDING = 'REGISTER_CATTLE_PENDING';
export let REGISTER_CATTLE_SUCCESS = 'REGISTER_CATTLE_SUCCESS';
export let REGISTER_CATTLE_ERROR = 'REGISTER_CATTLE_ERROR';

export function registerCattle(params,img) {
  let token = store.getState().authentication.token;
  return (dispatch) => {
    dispatch(registerCattlePending());
    $.ajax(`${process.env.API_ENDPOINT}/cattle/new`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: params,
    }).then((response) => {
      dispatch(uploadCattleImage(response.cattle.id, img))
      dispatch(createCattleSuccess());
      dispatch(registerCattleSuccess(response.cattle));
    }).catch((error) => {
      dispatch(registerCattleError(error));
    })
  };
};

export function registerCattlePending() {
  return {
    type: REGISTER_CATTLE_PENDING,
  };
};

export function registerCattleSuccess(cattle) {
  return {
    type: REGISTER_CATTLE_SUCCESS,
    cattle,
  };
};

export function registerCattleError(error) {
  return {
    type: REGISTER_CATTLE_ERROR,
    error,
  };
};

// Cattle update
export let UPDATE_CATTLE_PENDING = 'UPDATE_CATTLE_PENDING';
export let UPDATE_CATTLE_SUCCESS = 'UPDATE_CATTLE_SUCCESS';
export let UPDATE_CATTLE_ERROR = 'UPDATE_CATTLE_ERROR';

export function updateCattle(id, params) {
  let token = store.getState().authentication.token;

  return (dispatch) => {
    dispatch(updateCattlePending());
    $.ajax(`${process.env.API_ENDPOINT}/cattle/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: params,
    }).then((response) => {
      dispatch(cattlePostEditingRedirect());
      dispatch(updateCattleSuccess(response.cattle));
      for (let cattle of response.cattle) {
        dispatch(fetchCattleImage(cattle.id))
      }
    }).catch((error) => {
      dispatch(updateCattleError(error));
    })
  };
};

export function updateCattlePending() {
  return {
    type: UPDATE_CATTLE_PENDING,
  };
};

export function updateCattleSuccess(cattle) {
  return {
    type: UPDATE_CATTLE_SUCCESS,
    cattle,
  };
};

export function updateCattleError(error) {
  return {
    type: UPDATE_CATTLE_ERROR,
    error,
  };
}

// Cattle update
export let DELETE_CATTLE_PENDING = 'DELETE_CATTLE_PENDING';
export let DELETE_CATTLE_SUCCESS = 'DELETE_CATTLE_SUCCESS';
export let DELETE_CATTLE_ERROR = 'DELETE_CATTLE_ERROR';

export function deleteCattle(id) {
  let token = store.getState().authentication.token;
  return (dispatch) => {
    dispatch(deleteCattlePending());
    $.ajax(`${process.env.API_ENDPOINT}/cattle/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then((response) => {
      dispatch(cattlePostEditingRedirect());
      dispatch(deleteCattleSuccess(id));
    }).catch((error) => {
      dispatch(deleteCattleError(error));
    })
  };
};

export function deleteCattlePending() {
  return {
    type: DELETE_CATTLE_PENDING,
  };
};

export function deleteCattleSuccess(id) {
  return {
    type: DELETE_CATTLE_SUCCESS,
    id,
  };
};

export function deleteCattleError(error) {
  return {
    type: DELETE_CATTLE_ERROR,
    error,
  };
}

// Cattle edit
export let EDITING_CATTLE_ENABLED = 'EDITING_CATTLE_ENABLED';
export let EDITING_CATTLE_DISABLED = 'EDITING_CATTLE_DISABLED';

export function editCattle(id)  {
  return(dispatch) => {
    dispatch(enableEditingCattle(id));
    dispatch(cattleEditingRedirect());
  }
}

export function enableEditingCattle(id) {
  return{
    type: EDITING_CATTLE_ENABLED,
    id,
  }
}

export function endEditCattle(id)  {
  return (dispatch) =>  {
    dispatch(cattlePostEditingRedirect());
    dispatch(disableEditingCattle());
  }
}

export function disableEditingCattle(id) {
  return{
    type: EDITING_CATTLE_DISABLED,
    id,
  }
}

// Cattle fetch image
export let FETCH_CATTLE_IMAGE_PENDING = 'FETCH_CATTLE_IMAGE_PENDING';
export let FETCH_CATTLE_IMAGE_SUCCESS = 'FETCH_CATTLE_IMAGE_SUCCESS';
export let FETCH_CATTLE_IMAGE_ERROR = 'FETCH_CATTLE_IMAGE_ERROR';

export function fetchCattleImage(id) {
  let token = store.getState().authentication.token;
  return (dispatch) => {
    dispatch(fetchCattleImagePending(id));
    $.ajax(`${process.env.API_ENDPOINT}/cattle/${id}/images`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      method: 'GET'
    }).then((response) => {
      dispatch(fetchCattleImageSuccess(id, response.images));
    }).catch((error) => {
      dispatch(fetchCattleImageError(error));
    })
  };
};

export function fetchCattleImagePending(id) {
  return {
    type: FETCH_CATTLE_IMAGE_PENDING,
    id
  };
};

export function fetchCattleImageSuccess(id, images) {
  return {
    type: FETCH_CATTLE_IMAGE_SUCCESS,
    id,
    images,
  };
};

export function fetchCattleImageError(error) {
  return {
    type: FETCH_CATTLE_IMAGE_ERROR,
    error,
  };
};

// Cattle identify
export let REQUEST_MATCH_CATTLE_PENDING = 'REQUEST_MATCH_CATTLE_PENDING';
export let REQUEST_MATCH_CATTLE_SUCCESS = 'REQUEST_MATCH_CATTLE_SUCCESS';
export let REQUEST_MATCH_CATTLE_ERROR = 'REQUEST_MATCH_CATTLE_ERROR';

export function requestMatchCattle(params) {
  params = { data: 'VG9tIGxvdmVzIGNhdHRsZSE=' };
  let token = store.getState().authentication.token;
  return (dispatch) => {
    dispatch(requestMatchCattlePending());
    $.ajax(`${process.env.API_ENDPOINT}/cattle/match`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: params,
    }).then((response) => {
      dispatch(matchCattle(response.match.id));
      dispatch(requestMatchCattleSuccess(response.match.id));
    }).catch((error) => {
      dispatch(requestMatchCattleError(error));
    })
  };
};

export function requestMatchCattlePending() {
  return {
    type: REQUEST_MATCH_CATTLE_PENDING,
  };
};

export function requestMatchCattleSuccess(id) {
  return {
    type: REQUEST_MATCH_CATTLE_SUCCESS,
    match_id: id,
  };
};

export function requestMatchCattleError(error) {
  return {
    type: REQUEST_MATCH_CATTLE_ERROR,
    error,
  };
};

export let MATCH_CATTLE_PENDING = 'MATCH_CATTLE_PENDING';
export let MATCH_CATTLE_SUCCESS = 'MATCH_CATTLE_SUCCESS';
export let MATCH_CATTLE_EXCEPTION = 'MATCH_CATTLE_EXCEPTION';
export let MATCH_CATTLE_ERROR = 'MATCH_CATTLE_ERROR';

export function matchCattle(id) {
  let token = store.getState().authentication.token;
  return (dispatch) => {
    dispatch(matchCattlePending());
    $.ajax(`${process.env.API_ENDPOINT}/cattle/match/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.cattle) {
        dispatch(identifyCattleSuccess());
        dispatch(matchCattleSuccess(response.cattle));
      }
      else if (response.pending)
        setTimeout(() => {
          if (store.getState().identification.identifying)
            dispatch(matchCattle(id));
        }, 2000);
      else if (!response.found)
        dispatch(matchCattleException('No match found'));
      else if (response.lost)
        dispatch(matchCattleException('Cattle information lost'));
    }).catch((error) => {
      dispatch(matchCattleError(error));
    })
  };
};

export function matchCattlePending() {
  return {
    type: MATCH_CATTLE_PENDING,
  };
};

export function matchCattleSuccess(cattle) {
  return {
    type: MATCH_CATTLE_SUCCESS,
    match: cattle,
  };
};

export function matchCattleException(exception) {
  return {
    type: MATCH_CATTLE_EXCEPTION,
    exception: exception
  };
};

export function matchCattleError(error) {
  return {
    type: MATCH_CATTLE_ERROR,
    error,
  };
};

// Handle error popups
export let CATTLE_ERROR_SEEN = 'CATTLE_ERROR_SEEN';

export function cattleErrorSeen() {
  return {
    type: CATTLE_ERROR_SEEN,
  }
}

// Cattle image upload
export const UPLOAD_CATTLE_IMAGE_PENDING = 'UPLOAD_CATTLE_IMAGE_PENDING'
export const UPLOAD_CATTLE_IMAGE_SUCCESS = 'UPLOAD_CATTLE_IMAGE_SUCCESS'
export const UPLOAD_CATTLE_IMAGE_ERROR = 'UPLOAD_CATTLE_IMAGE_ERROR'

export const uploadCattleImage = (id, image) => {
  let token = store.getState().authentication.token
  return (dispatch) => {
    dispatch(uploadCattleImagePending())
    $.ajax(`${process.env.API_ENDPOINT}/cattle/${id}/images`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      method: 'POST',
      data: {
        data: image
      },
    }).then((response) => {
      dispatch(uploadCattleImageSuccess())
    }).catch((error) => {
      dispatch(uploadCattleImageError(error))
    })
  }
}

export const uploadCattleImagePending = () => {
  return {
    type: UPLOAD_CATTLE_IMAGE_PENDING,
  }
}

export const uploadCattleImageSuccess = () => {
  return {
    type: UPLOAD_CATTLE_IMAGE_SUCCESS,
  }
}

export const uploadCattleImageError = (error) => {
  return {
    type: UPLOAD_CATTLE_IMAGE_ERROR,
    error,
  }
}
