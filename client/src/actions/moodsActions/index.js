import axios from 'axios';

import {
  CREATE_MOOD,
  DELETE_MOOD,
  ADD_MOOD_TO_TEA
} from './types';

export const createMood = (data) => async dispatch => {
  console.log(data);
  const res = axios.post('/api/teas/moods/create', data);
  console.log(res.data);

  dispatch({ type: CREATE_MOOD, payload: res.data });
}

export const addMoodToTea = (teaId, mood) => async dispatch => {
  const res = axios.post(`/api/teas/${teaId}/mood/add`, { mood });

  dispatch({ type: ADD_MOOD_TO_TEA, payload: res.data });
}
