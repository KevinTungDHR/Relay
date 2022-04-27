import { 
  RECEIVE_WORKSPACES,
  RECEIVE_WORKSPACE,
  REMOVE_WORKSPACE } 
  from "../actions/workspace_actions";
import merge from 'lodash/merge';

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = merge({}, state);
  switch(action.type){
    case RECEIVE_WORKSPACES:
      return merge({}, action.workspaces)
    case RECEIVE_WORKSPACE:
      nextState[action.workspace.id] = action.workspace
      return nextState;
    case REMOVE_WORKSPACE:
      delete nextState[action.workspaceId]
      return nextState;
    default:
      return state;
  }
}

export default workspaceReducer;