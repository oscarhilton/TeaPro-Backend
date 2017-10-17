import {
  NEW_CATEGORY_TITLE_CHANGE,
  GET_ALL_CATEGORIES,
  NEW_CATEGORY,
  NEW_TEA,
  DELETE_CATEGORY,
  GET_CATEGORY_BY_NAME,
  NEW_TEA_TITLE_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
  formValues: {
     newCategory: {
       title: ''
     },
     editCategory: {
     },
     newTea: {
       title: ''
     }
   },
  list: [],
  selected: {
    title: '',
    teas: []
  }
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEW_CATEGORY_TITLE_CHANGE:
      return {
        ...state,
        formValues: {
          newCategory: {
            title: action.payload
          }
        }
      };
    case NEW_CATEGORY:
      return {
        ...state,
        list: [
          ...state.list,
          action.payload.category
        ]
      }
    case NEW_TEA_TITLE_CHANGE:
      return {
        ...state,
        formValues: {
          ...state.formValues,
          newTea: {
            ...state.formValues.newTea,
            title: action.payload
          }
        }
      };
    case NEW_TEA:
      return {
        ...state,
        selected: {
          ...state.selected,
          teas: [
            ...state.selected.teas,
            action.payload.newTea
          ]
        }
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        list: action.payload
      };
    case GET_CATEGORY_BY_NAME:
      return {
        ...state,
        selected: action.payload.cat
      };
    case DELETE_CATEGORY:
      let list = state.list,
          category = action.payload.cat,
          index = list.findIndex( (el) => el._id === action.payload.cat._id );
      list.splice(index, 1);
      return {
        ...state,
        index
      }
    default:
      return state;
  }
}
