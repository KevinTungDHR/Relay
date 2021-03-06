import { combineReducers } from 'redux'
import channelsReducer from './channels_reducer';
import directMessagesReducer from './direct_messages_reducer';
import messagesReducer from './messages_reducer';
import pendingWorkspaceReducer from './pending_workspaces_reducer';
import subscriptionsReducer from './subscriptions_reducer';
import usersReducer from './users_reducer'
import workspaceReducer from './workspaces_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  workspaces: workspaceReducer,
  channels: channelsReducer,
  directMessages: directMessagesReducer,
  subscriptions: subscriptionsReducer,
  messages: messagesReducer,
  pendingWorkspaces: pendingWorkspaceReducer
});

export default entitiesReducer;