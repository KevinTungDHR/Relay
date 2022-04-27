import { combineReducers } from 'redux'
import usersReducer from './users_reducer'
import workspaceReducer from './workspaces_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  workspaces: workspaceReducer
});

export default entitiesReducer;