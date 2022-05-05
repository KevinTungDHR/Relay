export const createDirectMessage = (directMessage) => {
  return $.ajax({
    method: 'POST',
    url: `/api/direct_messages/`,
    data: { directMessage }
  })
}