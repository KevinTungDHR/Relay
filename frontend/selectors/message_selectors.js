export const selectChannelMessages = ({ messages, channelId }) => {
  return Object.values(messages).filter(message => message.messageableId === parseInt(channelId))
}