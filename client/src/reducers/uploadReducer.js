import {
  FETCH_ALL_FILES,
  UPLOAD_FILE,
  DELETE_FILE
} from '../actions/uploadActions/types';

export default function(state = {
  message: 'Ready to upload your file',
  files: []
}, action) {
  switch (action.type) {
    case FETCH_ALL_FILES:
      return {
        ...state,
        files: action.payload
      }
    case UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload],
        message: 'File uploaded successfully!'
      };
    case DELETE_FILE:
      let list = state.files;
      if (action.payload.deleted) {
        const file = action.payload.file;
        const index = list.findIndex( (el) => el._id === action.payload.file._id );
        list.splice(index, 1);
      }
      return {
        ...state,
        files: list,
        message: action.payload.message
      };
    default:
      return state;
  }
}
