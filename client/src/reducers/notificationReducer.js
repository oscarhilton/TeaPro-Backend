import {
  SEND_NEW_NOTIFICATION
} from '../actions/notificationActions/types';

const INITIAL_STATE = {
  list: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND_NEW_NOTIFICATION:
    console.log('NEW ACTION!!');
      return {
        ...state,
          list: [
          {
            notifcation: action.payload,
            time: Date.now()
          },
          ...state.list
        ]
      };
    default:
      return state;
  }
}
