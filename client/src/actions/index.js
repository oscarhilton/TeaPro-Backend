import axios from 'axios';
import {
  FETCH_USER,
  GET_ALL_TEAS,
  GET_ALL_CATEGORIES,
  NEW_CATEGORY_TITLE_CHANGE,
  NEW_CATEGORY,
  NEW_TEA,
  DELETE_CATEGORY
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('./api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const newCategoryTitleChange = (text) => {
  return {
    type: NEW_CATEGORY_TITLE_CHANGE,
    payload: text
  }
}

export const getAllTeas = () => async dispatch => {
  const res = await axios.get('/api/teas/all');

  dispatch({ type: GET_ALL_TEAS, payload: res.data.teas });
};

export const getAllCategories = () => async dispatch => {
  const res = await axios.get('/api/category/all');

  dispatch({ type: GET_ALL_CATEGORIES, payload: res.data.cats });
};

export const newCategory = (formValues) => async dispatch => {
  const { title } = formValues;
  const res = await axios.post('/api/category/new', { title } );

  console.log(res.data);

  dispatch({ type: NEW_CATEGORY, payload: res.data });
};

export const newTea = (title, catId) => async dispatch => {
  const newTea = await axios.post('/api/teas/new', { title, catId } );

  dispatch({ type: NEW_TEA, payload: { message: newTea.data.message, tea: newTea.data.tea } });
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
