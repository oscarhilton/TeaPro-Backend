import { NEW_CATEGORY_TITLE_CHANGE, GET_ALL_CATEGORIES } from '../actions/types';

const INITIAL_STATE = {
  formValues: { title: '' },
  list: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEW_CATEGORY_TITLE_CHANGE:
      return {...state, formValues: { title: action.payload } };
    case GET_ALL_CATEGORIES:
      return {...state, list: action.payload  };
    default:
      return state;
  }
}
