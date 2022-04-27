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

export const createWorkspace = () => {
  return $.ajax({
    method: 'POST',
    url: '/api/workspaces'
  })
}

export const updateWorkspace = (workspace) => {
  return $.ajax({
    method: 'POST',
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


