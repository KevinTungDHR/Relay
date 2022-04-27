import { RECEIVE_WORKSPACE, RECEIVE_WORKSPACES, RECEIVE_WORKSPACE_ERRORS } from "../actions/workspace_actions";
import merge from 'lodash/merge';

const workspaceErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_WORKSPACE_ERRORS:
      return action.errors
    case RECEIVE_WORKSPACES:
    case RECEIVE_WORKSPACE:
      return [];
    default:
      return state;
  }
}

export default workspaceErrorsReducer;