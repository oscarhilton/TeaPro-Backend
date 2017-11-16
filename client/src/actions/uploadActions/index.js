import axios from 'axios';

import {
  UPLOAD_FILE,
  FETCH_ALL_FILES,
  DELETE_FILE,
} from './types';

export const uploadFile = (data) => async dispatch => {
  const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
  const res = await axios.post('/api/upload', data, config);
  dispatch({ type: UPLOAD_FILE, payload: res.data });
}

export const fetchAllFiles = () => async dispatch => {
  const res = await axios.get('/api/media/all');
  dispatch({ type: FETCH_ALL_FILES, payload: res.data });
}

export const deleteFile = (fileId) => async dispatch => {
  const res = await axios.post(`/api/media/${fileId}/delete`);
  dispatch({ type: DELETE_FILE, payload: res.data });
}
