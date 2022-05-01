import { 
  RECEIVE_CHANNEL_BROWSER_SEARCH
 } from "../actions/search_actions";
import merge from 'lodash/merge';

const initialState = {
  browserChannels: {}
}

const searchReducer = (state = initialState, action) => {
  Object.freeze(state);
  const nextState = merge({}, state);
  switch(action.type){
    case RECEIVE_CHANNEL_BROWSER_SEARCH:
      nextState['browserChannels'] = action.channels;
      return nextState;
    default:
      return state;
  }
}

export default searchReducer;