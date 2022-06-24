export const fetchSignedinWorkspaces = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/workspaces',
    data: {
      only_signedin: true
    }
  })
}

export const fetchAllWorkspaces = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/workspaces',
  })
}

export const fetchWorkspace = (workspaceId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/workspaces/${workspaceId}`,
  })
}


export const createWorkspace = () => {
  return $.ajax({
    method: 'POST',
    url: '/api/workspaces'
  })
}

export const updateWorkspace = (workspace) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/workspaces/${workspace.id}`,
    data: { workspace }
  })
}

export const deleteWorkspace = (workspaceId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/workspaces/${workspaceId}`
  })
}

export const inviteToWorkspace = (workspaceId, workspace) => {
  return $.ajax({
    method: 'POST',
    url: `/api/workspaces/${workspaceId}/invite/`,
    data: { workspace }
  })
}

export const fetchPendingWorkspaces = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/workspaces/pending_subscriptions`,
  })
}

export const acceptWorkspaceInvite = (workspaceId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/workspaces/${workspaceId}/accept/`,
  })
}

export const declineWorkspaceInvite = (workspaceId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/workspaces/${workspaceId}/decline/`,
  })
}