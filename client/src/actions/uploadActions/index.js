import axios from 'axios';

import {
  UPLOAD_FILE,
  FETCH_ALL_FILES
} from './types';

export const uploadFile = (data) => async dispatch => {
  const res = await axios.post('/api/upload', data);
  dispatch({ type: UPLOAD_FILE, payload: res.data });
}

export const fetchAllFiles = () => async dispatch => {
  const res = await axios.get('/api/media/all');
  dispatch({ type: FETCH_ALL_FILES, payload: res.data });
}
