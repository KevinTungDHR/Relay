import * as WorkspacesAPIUtil from '../util/workspaces_util'
export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES';
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE';
export const REMOVE_WORKSPACE = 'REMOVE_WORKSPACE';
export const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveWorkspaces = (workspaces) => {
  return {
    type: RECEIVE_WORKSPACES,
    workspaces
  }
}

const receiveWorkspace = (workspace) => {
  return {
    type: RECEIVE_WORKSPACE,
    workspace
  }
}

const removeWorkspace = (workspaceId) => {
  return {
    type: REMOVE_WORKSPACE,
    workspaceId
  }
}

const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export const fetchAllWorkspaces = () => dispatch => {
  return WorkspacesAPIUtil.fetchAllWorkspaces()
    .then(data => dispatch(receiveWorkspaces(data)))
}

export const fetchSignedinWorkspaces = () => dispatch => {
  return WorkspacesAPIUtil.fetchSignedinWorkspaces()
    .then(data => dispatch(receiveWorkspaces(data)))
}

export const fetchWorkspace = (workspaceId) => dispatch => {
  return WorkspacesAPIUtil.fetchWorkspace(workspaceId)
    .then(({ users, subscriptions }) => {
      dispatch(receiveUsers(users))
    })
}

export const createWorkspace = () => dispatch => {
  return WorkspacesAPIUtil.createWorkspace()
    .then(data => dispatch(receiveWorkspace(data)))
}

export const updateWorkspace = (formWorkspace) => dispatch => {
  return WorkspacesAPIUtil.updateWorkspace(formWorkspace)
    .then(data => dispatch(receiveWorkspace(data)))
}
export const deleteWorkspace = (workspaceId) => dispatch => {
  return WorkspacesAPIUtil.deleteWorkspace(workspaceId)
    .then(() => dispatch(removeWorkspace(workspaceId)))
}