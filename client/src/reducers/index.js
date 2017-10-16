import { combineReducers } from 'redux';
import auth from './authReducer';
import teas from './teasReducer';
import categories from './categoryReducer';

export default combineReducers({
  auth,
  teas,
  categories
});
