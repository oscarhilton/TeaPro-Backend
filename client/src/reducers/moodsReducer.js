import {
  REQUEST_ALL_MOODS,
  RETURN_ALL_MOODS,
  CREATE_MOOD
} from '../actions/moodsActions/types';

import { sendNotification } from '../actions/notificationActions';

const INITIAL_STATE = {
  loading: null,
  moods: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_ALL_MOODS:
      return {
        ...state,
        loading: true,
      }
    case RETURN_ALL_MOODS:
      return {
        ...state,
        loading: false,
        moods: action.payload
      }
    case CREATE_MOOD:
      sendNotification('New mood created!');
      return {
        ...state,
        moods: [...state.moods, action.payload]
      }
    default:
      return state;
  }
}
