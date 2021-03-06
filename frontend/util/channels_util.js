export const fetchBrowserChannels = (workspaceId) => {
  return $.ajax({
    method: 'GET',
    url: '/api/channels/',
    data: { workspaceId }
  })
}

export const fetchChannel = (channelId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/channels/${channelId}`
  })
}

export const createChannel = (channel) => {
  return $.ajax({
    method: 'POST',
    url: '/api/channels/',
    data: { channel }
  })
}

export const updateChannel = (channel) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/channels/${channel.id}`,
    data: { channel }
  })
}

export const deleteChannel = (channelId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/channels/${channelId}`
  })
}

export const joinChannel = (channelId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/channels/${channelId}/subscribe`
  })
}

export const leaveChannel = (channelId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/channels/${channelId}/unsubscribe`
  })
}

export const addMembers = (channelId, members, allMembers) => {
  return $.ajax({
    method: 'POST',
    url: `/api/channels/${channelId}/addmembers`,
    data: { members, allMembers }
  })
}