import { combineReducers } from 'redux';
import auth from './authReducer';
import teas from './teasReducer';
import categories from './categoryReducer';
import moods from './moodsReducer';

export default combineReducers({
  auth,
  teas,
  categories,
  moods
});
