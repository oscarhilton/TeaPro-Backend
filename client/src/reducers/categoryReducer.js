import {
  NEW_CATEGORY_TITLE_CHANGE,
  GET_ALL_CATEGORIES,
  NEW_CATEGORY,
  DELETE_CATEGORY
} from '../actions/types';

const INITIAL_STATE = {
  formValues: { title: '' },
  list: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEW_CATEGORY_TITLE_CHANGE:
      return { ...state, formValues: { title: action.payload } };
    case NEW_CATEGORY:
      return { ...state, list: [...state.list, action.payload.category ]}
    case GET_ALL_CATEGORIES:
      return { ...state, list: action.payload  };
    case DELETE_CATEGORY:
      let list = state.list;
      let category = action.payload.cat;
      let index = list.findIndex( (el) => el._id === action.payload.cat._id );
      list.splice(index, 1);
      return { ...state, index }
    default:
      return state;
  }
}
