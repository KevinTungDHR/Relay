export const createChannelMessage = (channelId, message) => {
  return $.ajax({
    method: 'POST',
    url: `/api/channels/${channelId}/messages`,
    data: { 
      message
     }
  })
}

export const createDMMessage = (directMessageId, message) => {
  return $.ajax({
    method: 'POST',
    url: `/api/direct_messages/${directMessageId}/messages`,
    data: { 
      message
     }
  })
}