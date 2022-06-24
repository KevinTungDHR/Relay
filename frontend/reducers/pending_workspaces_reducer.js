import { 
  RECEIVE_WORKSPACE,
  RECEIVE_PENDING_WORKSPACES
 } 
  from "../actions/workspace_actions";

const pendingWorkspaceReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_PENDING_WORKSPACES:
      return Object.assign({}, action.workspaces)
    case RECEIVE_WORKSPACE:
      delete nextState[action.workspaceId]
      return nextState;
    default:
      return state;
  }
}

export default pendingWorkspaceReducer;