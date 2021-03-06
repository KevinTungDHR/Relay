import {
  RECEIVE_CURRENT_USER,
  REMOVE_CURRENT_USER
} from '../actions/session_actions';

const _nullSession = {
  id: null
};

const sessionReducer = (state = _nullSession, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { id: action.user.id })
    case REMOVE_CURRENT_USER:
      return _nullSession;
    default:
      return state;
  }
}

export default sessionReducer;