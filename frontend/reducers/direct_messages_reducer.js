import { 
  RECEIVE_DIRECT_MESSAGES, 
  RECEIVE_DIRECT_MESSAGE,
  REMOVE_DIRECT_MESSAGE,
  RECEIVE_ALL_DIRECT_MESSAGES
} from "../actions/direct_message_action";

const directMessagesReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch(action.type) {
    case RECEIVE_ALL_DIRECT_MESSAGES:
      return Object.assign({}, state, action.directMessages)
    case RECEIVE_DIRECT_MESSAGES:
      return Object.assign({}, state, action.directMessages)
    case RECEIVE_DIRECT_MESSAGE:
      nextState[action.directMessage.id] = action.directMessage
      return nextState
    case REMOVE_DIRECT_MESSAGE:
      delete nextState[action.directMessageId]
      return nextState;
    default:
      return state;
  }
}

export default directMessagesReducer;