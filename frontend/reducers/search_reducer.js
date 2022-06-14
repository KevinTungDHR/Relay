import { 
  RECEIVE_CHANNEL_BROWSER_SEARCH,
  RECEIVE_SEARCH_CHANNELS,
  RECEIVE_SEARCH_USERS,
  RECEIVE_QUERY,
  CLEAR_QUERY
 } from "../actions/search_actions";
import { HIDE_MODAL } from "../actions/ui_actions";

const initialState = {
  browserChannels: {},
  queryChannels: {},
  queryUsers: {},
  query: ""
}

const searchReducer = (state = initialState, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_CHANNEL_BROWSER_SEARCH:
      nextState['browserChannels'] = action.channels;
      return nextState;
    case RECEIVE_SEARCH_CHANNELS:
      nextState['queryChannels'] = action.channels;
      return nextState;
    case RECEIVE_SEARCH_USERS:
      nextState['queryUsers'] = action.users;
      return nextState;
    case RECEIVE_QUERY:
      nextState['query'] = action.query;
      return nextState
    case CLEAR_QUERY:
    case HIDE_MODAL:
      nextState['queryChannels'] = {}
      nextState['queryUsers'] = {}
      nextState['query'] = ''
      return nextState
    default:
      return state;
  }
}

export default searchReducer;