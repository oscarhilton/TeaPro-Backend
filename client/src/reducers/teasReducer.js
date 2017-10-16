import { GET_ALL_TEAS, NEW_TEA } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_TEAS:
      return [ ...state, ...action.payload ];
    case NEW_TEA:
      return [ ...state, action.payload.tea ];
    default:
      return state;
  }
}
