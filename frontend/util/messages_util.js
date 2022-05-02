export const createChannelMessage = (channelId, message) => {
  return $.ajax({
    method: 'POST',
    url: `/api/channels/${channelId}/messages`,
    data: { 
      message
     }
  })
}