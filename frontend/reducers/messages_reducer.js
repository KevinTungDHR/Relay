import { RECEIVE_DIRECT_MESSAGE, RECEIVE_DIRECT_MESSAGES, RECEIVE_ALL_DIRECT_MESSAGES  } from "../actions/direct_message_action";
import { 
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE
} from "../actions/message_actions";

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_MESSAGES:
      return Object.assign({}, state, action.messages)
    case RECEIVE_DIRECT_MESSAGES:
      return Object.assign({}, state, action.messages)
    case RECEIVE_ALL_DIRECT_MESSAGES:
      return Object.assign({}, state, action.messages)
    case RECEIVE_DIRECT_MESSAGE:
      return Object.assign({}, state, action.messages)
    case RECEIVE_MESSAGE:
      nextState[action.message.id] = action.message;
      return nextState;
    default:
      return state;
  }
}

export default messagesReducer;