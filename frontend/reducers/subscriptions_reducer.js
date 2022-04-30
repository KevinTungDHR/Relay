import { 
  RECEIVE_SUBSCRIPTIONS, 
  RECEIVE_SUBSCRIPTION, 
  REMOVE_SUBSCRIPTION 
} from "../actions/subscription_actions";
import merge from 'lodash/merge';

const subscriptionsReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = merge({}, state);
  switch(action.type){
    case RECEIVE_SUBSCRIPTIONS:
      return action.subscriptions;
    case RECEIVE_SUBSCRIPTION:
      nextState[action.subscription.id] = action.subscription;
      return nextState;
    case REMOVE_SUBSCRIPTION:
      delete nextState[action.subscriptionId]
      return nextState;
    default:
      return state;
  }
}

export default subscriptionsReducer;