export const fetchSearchQuery = (workspaceId, query) => {
  return $.ajax({
    method: 'GET',
    url: `/api/workspaces/${workspaceId}/search`,
    data: { query }
  })
}