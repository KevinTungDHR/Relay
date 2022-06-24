import { RECEIVE_DIRECT_MESSAGE } from "../actions/direct_message_action";
import { 
  RECEIVE_SUBSCRIPTIONS,
  RECEIVE_CHANNEL_SUBSCRIPTIONS, 
  RECEIVE_SUBSCRIPTION, 
  REMOVE_SUBSCRIPTION,
  REMOVE_CHANNEL_SUBSCRIPTIONS
} from "../actions/subscription_actions";
import { RECEIVE_PENDING_WORKSPACES } from "../actions/workspace_actions";

const subscriptionsReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_SUBSCRIPTIONS:
      return action.subscriptions;
    case RECEIVE_CHANNEL_SUBSCRIPTIONS:
      return Object.assign({}, state, action.subscriptions)
    case RECEIVE_SUBSCRIPTION:
      nextState[action.subscription.id] = action.subscription;
      return nextState;
    case RECEIVE_PENDING_WORKSPACES:
      return Object.assign({}, state, action.subscriptions)
    case REMOVE_SUBSCRIPTION:
      delete nextState[action.subscriptionId]
      return nextState
    case RECEIVE_DIRECT_MESSAGE:
      return Object.assign({}, state, action.subscriptions)
    case REMOVE_CHANNEL_SUBSCRIPTIONS:
      for(const key in nextState){
        if (nextState[key].subscribeableId === action.channelId && nextState[key].subscribeableType == "Channel"){
          delete nextState[key];
        }
        return nextState;
      }
      return nextState;
    default:
      return state;
  }
}

export default subscriptionsReducer;