import {
  CHANGE_LOGIN_USERNAME_CHANGE,
  CHANGE_LOGIN_PASSWORD_CHANGE
} from './types';

export const changeLoginUsernameChange = text => {
  return {
    type: CHANGE_LOGIN_USERNAME_CHANGE,
    payload: text
  };
};

export const changeLoginPasswordChange = text => {
  return {
    type: CHANGE_LOGIN_PASSWORD_CHANGE,
    payload: text
  };
};
