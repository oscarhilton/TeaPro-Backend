import {
  CHANGE_LOGIN_USERNAME_CHANGE,
  CHANGE_LOGIN_PASSWORD_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
  formValues: {
    username: '',
    password: ''
  }
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_LOGIN_FIELD:
      return {
        ...state,
        formValues: {
          ...state.formValues,
          username: action.payload
        }
      }
    case CHANGE_LOGIN_PASSWORD:
      return {
        ...state,
        formValues: {
          ...state.formValues,
          password: action.payload
        }
      }
    default:
      return state;
  }
}
