import { combineReducers } from 'redux'
import channelsReducer from './channels_reducer';
import messagesReducer from './messages_reducer';
import subscriptionsReducer from './subscriptions_reducer';
import usersReducer from './users_reducer'
import workspaceReducer from './workspaces_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  workspaces: workspaceReducer,
  channels: channelsReducer,
  subscriptions: subscriptionsReducer,
  messages: messagesReducer
});

export default entitiesReducer;