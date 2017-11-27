import axios from 'axios';

import {
  CREATE_MOOD,
  DELETE_MOOD,
  ADD_MOOD_TO_TEA,
  REQUEST_ALL_MOODS,
  RETURN_ALL_MOODS
} from './types';

export const requestMoods = () => dispatch => {
  dispatch({ type: REQUEST_ALL_MOODS });
}

export const returnAllMoods = () => async dispatch => {
  const res = await axios.get('/api/moods/all');
  dispatch({ type: RETURN_ALL_MOODS, payload: res.data });
}

export const createMood = (data) => async dispatch => {
  const res = await axios.post('/api/teas/moods/create', data);
  console.log(res.data);
  dispatch({ type: CREATE_MOOD, payload: res.data });
}

export const addMoodToTea = (teaId, mood) => async dispatch => {
  const res = axios.post(`/api/teas/${teaId}/mood/add`, { mood });
  dispatch({ type: ADD_MOOD_TO_TEA, payload: res.data });
}
