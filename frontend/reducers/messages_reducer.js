import { 
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE
} from "../actions/message_actions";
import merge from 'lodash/merge';

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = merge({}, state);
  switch(action.type){
    case RECEIVE_MESSAGES:
      return merge({}, action.messages)
    case RECEIVE_MESSAGE:
      nextState[action.message.id] = action.message;
      return nextState;
    default:
      return state;
  }
}

export default messagesReducer;