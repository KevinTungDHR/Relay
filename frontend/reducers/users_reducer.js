import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user_actions';
import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = merge({}, state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_USERS:
      return merge({}, action.users)
    case RECEIVE_USER:
      nextState[action.user.id] = action.user
      return nextState;
    default:
      return state;
  }
};

export default usersReducer;