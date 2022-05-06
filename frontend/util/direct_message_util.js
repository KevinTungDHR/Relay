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