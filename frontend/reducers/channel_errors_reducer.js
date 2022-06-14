import { 
  RECEIVE_CHANNEL_ERRORS,
  RECEIVE_CHANNELS,
  RECEIVE_CHANNEL
 } from "../actions/channel_actions";

import { HIDE_MODAL } from "../actions/ui_actions";

const channelErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CHANNEL_ERRORS:
      return action.errors; 
    case RECEIVE_CHANNELS:
    case RECEIVE_CHANNEL:
    case HIDE_MODAL:
      return [];
    default:
      return state;
  }
}

export default channelErrorsReducer;