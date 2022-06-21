export const createDirectMessage = (directMessage) => {
  return $.ajax({
    method: 'POST',
    url: `/api/direct_messages/`,
    data: { directMessage }
  })
} 

export const fetchDirectMessage = (directMessageId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/direct_messages/${directMessageId}`
  })
} 


export const closeDirectMessage = (directMessageId) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/direct_messages/${directMessageId}/close_message`
  })
} 

export const fetchAllDMs = (workspaceId) => {
  return $.ajax({
    method: 'GET',
    url: '/api/direct_messages',
    data: {
      workspaceId
    }
  })
}