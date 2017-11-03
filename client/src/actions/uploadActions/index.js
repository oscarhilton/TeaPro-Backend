import axios from 'axios';

import {
  UPLOAD_FILE
} from './types';

export const uploadFile = (data) => async dispatch => {
  const res = axios.post('/api/upload', data);

  dispatch({ type: UPLOAD_FILE, payload: res.data });
}
