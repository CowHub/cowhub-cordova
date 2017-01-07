import store from '../store/store';
import { notification } from 'onsenui';
import { cattleErrorSeen } from '../actions'

export function handleError(error, callback = () => store.dispatch(cattleErrorSeen())) {
  if (!error)
    return null;

  console.error(error);

  let msg = error.responseJSON
    ? error.responseJSON.errors
      ? error.responseJSON.errors[0]
      : error.responseJSON.error
    : error.responseText;

  return notification.alert({
    title: 'Error',
    message: msg,
    callback: callback
  });
}
