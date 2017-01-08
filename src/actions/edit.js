import $ from 'jquery';
import store from '../store/store';
import {
    cattleEditingRedirect,
    cattlePostEditingRedirect
} from './navigation';

// Cattle edit
export let SHOW_CATTLE = 'SHOW_CATTLE';
export let EDITING_CATTLE_ENABLED = 'EDITING_CATTLE_ENABLED';
export let EDITING_CATTLE_DISABLED = 'EDITING_CATTLE_DISABLED';
export let END_SHOW_CATTLE = 'END_SHOW_CATTLE';

export function showCattle(id)  {
  return(dispatch) => {
    dispatch(setCattleToDisplay(id));
    dispatch(cattleEditingRedirect());
  }
}

export function endShow() {
  return(dispatch)  => {
    dispatch(cattlePostEditingRedirect());
    dispatch(endShowCattle());
  }
}

export function postDelete()  {
  return(dispatch)  =>  {
    dispatch(endEditCattle());
    dispatch(endShow());
  }
}

export function setCattleToDisplay(id) {
  return{
    type: SHOW_CATTLE,
    id
  }
}

export function startEditCattle(id)  {
  return(dispatch) => {
    dispatch(enableEditingCattle());
  }
}

export function enableEditingCattle() {
  return{
    type: EDITING_CATTLE_ENABLED
  }
}

export function endEditCattle() {
  return (dispatch) =>  {
    dispatch(disableEditingCattle());
  }
}

export function disableEditingCattle() {
  return{
    type: EDITING_CATTLE_DISABLED
  }
}

export function endShowCattle() {
  return{
    type: SHOW_CATTLE,
  }
}

