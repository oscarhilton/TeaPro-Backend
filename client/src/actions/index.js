import axios from 'axios';
import {
  FETCH_USER,
  GET_ALL_TEAS,
  GET_ALL_CATEGORIES,
  NEW_CATEGORY,
  EDIT_CATEGORY,
  NEW_TEA,
  DELETE_CATEGORY,
  GET_CATEGORY_BY_NAME
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('./api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const editCategory = (catId, editObj) => async dispatch => {
  const res = await axios.post('/api/category/edit/' + catId, { editObj } );

  dispatch({ type: EDIT_CATEGORY, payload: res.data });
};

export const getAllTeas = () => async dispatch => {
  const res = await axios.get('/api/teas/all');

  dispatch({ type: GET_ALL_TEAS, payload: res.data.teas });
};

export const getAllCategories = () => async dispatch => {
  const res = await axios.get('/api/category/all');

  console.log(res);

  dispatch({ type: GET_ALL_CATEGORIES, payload: res.data });
};

export const getCategoryByName = (title) => async dispatch => {
  const res = await axios.get('/api/category/' + title);

  dispatch({ type: GET_CATEGORY_BY_NAME, payload: res.data });
};

export const newCategory = (formValues) => async dispatch => {
  const { title } = formValues;
  const res = await axios.post('/api/category/new', { title } );

  dispatch({ type: NEW_CATEGORY, payload: res.data });
};

export const newTea = (tea, catId) => async dispatch => {
  const res = await axios.post('/api/teas/new', { tea, catId } );
  const { message, newTea } = res.data;

  dispatch({ type: NEW_TEA, payload: { message, newTea } });
};

export const deleteCategory = (id) => async dispatch => {
  const res = await axios.post('/api/category/delete/' + id);

  dispatch({ type: DELETE_CATEGORY, payload: res.data });
}

export const getTeaCategory = (teaId) => async dispatch => {
  const teaCat = await axios.get('/api/teas/' + teaId + '/category');

  // dispatch({ type: LOAD_TEAS, payload: {} });
};

export const getCategoryTeas = (catId) => async dispatch => {
  const catTeas = await axios.get('/api/category/' + catId + '/teas');

  // dispatch({ type: LOAD_TEAS, payload: {} });
};
