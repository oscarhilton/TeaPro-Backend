import {
  SEND_NEW_NOTIFICATION
} from './types';

export const sendNotification = (notifcation) => dispatch => {
  dispatch({ type: SEND_NEW_NOTIFICATION, payload: notifcation });
};
