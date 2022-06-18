import { RECEIVE_DIRECT_MESSAGE } from '../actions/direct_message_action';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USERS, RECEIVE_USER, RECEIVE_CHANNEL_USERS } from '../actions/user_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    case RECEIVE_USERS:
      return Object.assign({}, action.users)
    case RECEIVE_CHANNEL_USERS:
      return Object.assign({}, state, action.users)
    case RECEIVE_DIRECT_MESSAGE:
      return Object.assign({}, state, action.users)
    case RECEIVE_USER:
      nextState[action.user.id] = action.user
      return nextState;
    default:
      return state;
  }
};

export default usersReducer;