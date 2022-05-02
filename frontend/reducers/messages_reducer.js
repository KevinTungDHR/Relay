import { 
  RECEIVE_MESSAGES 
} from "../actions/message_actions";
import merge from 'lodash/merge';

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_MESSAGES:
      return merge({}, action.messages)
    default:
      return state;
  }
}

export default messagesReducer;