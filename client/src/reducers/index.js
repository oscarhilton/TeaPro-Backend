import { combineReducers } from 'redux';
import auth from './authReducer';
import teas from './teasReducer';
import categories from './categoryReducer';
import moods from './moodsReducer';
import media from './uploadReducer';
import notifications from './notificationReducer';

export default combineReducers({
  auth,
  teas,
  categories,
  moods,
  media,
  notifications
});
