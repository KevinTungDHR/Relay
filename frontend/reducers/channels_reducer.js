import { 
  RECEIVE_CHANNELS, 
  RECEIVE_CHANNEL, 
  REMOVE_CHANNEL,
} from "../actions/channel_actions";

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch(action.type) {
    case RECEIVE_CHANNELS:
      return action.channels
    case RECEIVE_CHANNEL:
      nextState[action.channel.id] = action.channel
      return nextState;
    case REMOVE_CHANNEL:
      delete nextState[action.channelId]
      return nextState;
    default:
      return state;
  }
}

export default channelsReducer;