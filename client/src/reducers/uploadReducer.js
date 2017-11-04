import { FETCH_ALL_FILES, UPLOAD_FILE } from '../actions/uploadActions/types';

export default function(state = {
  files: []
}, action) {
  switch (action.type) {
    case FETCH_ALL_FILES:
      return {
        files: action.payload
      }
    case UPLOAD_FILE:
      return;
    default:
      return state;
  }
}
