import { 
  RECEIVE_WORKSPACES,
  RECEIVE_WORKSPACE,
  REMOVE_WORKSPACE } 
  from "../actions/workspace_actions";

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_WORKSPACES:
      return Object.assign({}, action.workspaces)
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