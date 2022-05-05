import { 
  RECEIVE_DIRECT_MESSAGE,
  RECEIVE_DIRECT_MESSAGES
} from "../actions/direct_message_actions";

const directMessageReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_DIRECT_MESSAGES:
      return action.directMessages
    case RECEIVE_DIRECT_MESSAGE:
      nextState[action.directMessage.id] = action.directMessage
      return nextState
    default:
      return state;
  }
}

export default directMessageReducer;