import * as WorkspacesAPIUtil from '../util/workspaces_util'
import { receiveUsers  } from './user_actions';
import { receiveChannels } from './channel_actions';
import { receiveSubscriptions } from './subscription_actions'
import { batch } from 'react-redux';
import { receiveDirectMessages } from './direct_message_action';
export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES';
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE';
export const REMOVE_WORKSPACE = 'REMOVE_WORKSPACE';
export const RECEIVE_WORKSPACE_ERRORS = "RECEIVE_WORKSPACE_ERRORS";
export const RECEIVE_PENDING_WORKSPACES = 'RECEIVE_PENDING_WORKSPACES';
export const REMOVE_PENDING_WORKSPACE = 'REMOVE_PENDING_WORKSPACE';

export const receiveWorkspaces = (workspaces) => {
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

const receiveWorkspaceErrors = (errors) => {
  return {
    type: RECEIVE_WORKSPACE_ERRORS,
    errors
  }
}

const receivePendingWorkspaces = (workspaces) => {
  return {
    type: RECEIVE_PENDING_WORKSPACES,
    ...workspaces
  }
}

const removePendingWorkspace = (workspaceId) => {
  return {
    type: REMOVE_PENDING_WORKSPACE,
    workspaceId
  }
}

const removeWorkspace = (workspaceId) => {
  return {
    type: REMOVE_WORKSPACE,
    workspaceId
  }
}

export const fetchAllWorkspaces = () => dispatch => {
  return WorkspacesAPIUtil.fetchAllWorkspaces()
    .then(data => dispatch(receiveWorkspaces(data)))
    .fail((errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON)))
}

export const fetchSignedinWorkspaces = () => dispatch => {
  return WorkspacesAPIUtil.fetchSignedinWorkspaces()
    .then(data => dispatch(receiveWorkspaces(data)))
    .fail((errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON)))
}

export const fetchWorkspace = (workspaceId) => dispatch => {
  return WorkspacesAPIUtil.fetchWorkspace(workspaceId)
    .then(({ users, subscriptions, channels, directMessages }) => {
      batch(() => {
        dispatch(receiveUsers(users))
        dispatch(receiveChannels(channels))
        dispatch(receiveSubscriptions(subscriptions))
        dispatch(receiveDirectMessages(directMessages))
      })
    })
    .fail((errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON)))
}

export const createWorkspace = () => dispatch => {
  return WorkspacesAPIUtil.createWorkspace()
    .then(data => dispatch(receiveWorkspace(data)))
    .fail((errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON)))
}

export const updateWorkspace = (formWorkspace) => dispatch => {
  return WorkspacesAPIUtil.updateWorkspace(formWorkspace)
    .then(data => dispatch(receiveWorkspace(data)))
    .fail((errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON)))
}

export const deleteWorkspace = (workspaceId) => dispatch => {
  return WorkspacesAPIUtil.deleteWorkspace(workspaceId)
    .then(() => dispatch(removeWorkspace(workspaceId)))
    .fail((errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON)))
}

export const inviteToWorkspace = (workspaceId, workspace) => dispatch => {
  return WorkspacesAPIUtil.inviteToWorkspace(workspaceId, workspace)
    .then()
    .fail((errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON)))

}

export const fetchPendingWorkspaces = () => dispatch => {
  return WorkspacesAPIUtil.fetchPendingWorkspaces()
    .then((data) => dispatch(receivePendingWorkspaces(data)))
    .fail((errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON)))
}

export const acceptWorkspaceInvite = (workspaceId) => dispatch => {
  return WorkspacesAPIUtil.acceptWorkspaceInvite(workspaceId)
    .then((workspace) => dispatch(receiveWorkspace(workspace)) )
    .fail((errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON)))

}

export const declineWorkspaceInvite = (workspaceId) => dispatch => {
  return WorkspacesAPIUtil.declineWorkspaceInvite(workspaceId)
    .then(() => dispatch(removePendingWorkspace(workspaceId)))
    .fail((errors) => dispatch(receiveWorkspaceErrors(errors.responseJSON)))

}