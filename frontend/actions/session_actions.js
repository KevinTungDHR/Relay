import * as SessionAPIUtil from '../util/session_api_util';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';

const receiveCurrentUser = (user) => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  };
};

const logoutCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const removeErrors = () => {
  return {
    type: REMOVE_ERRORS
  };
};

export const login = (formUser) => dispatch => {
  return SessionAPIUtil.login(formUser)
    .then(user => dispatch(receiveCurrentUser(user)))
    .fail((errors) => dispatch(receiveErrors(errors.responseJSON)));
};

export const logout = () => dispatch => {
  return SessionAPIUtil.logout()
    .then(() => dispatch(logoutCurrentUser()))
    .fail((errors) => dispatch(receiveErrors(errors.responseJSON)));
};

export const signup = (formUser) => dispatch => {
  return SessionAPIUtil.signup(formUser)
    .then(user => dispatch(receiveCurrentUser(user)))
    .fail((errors) => dispatch(receiveErrors(errors.responseJSON)));
}