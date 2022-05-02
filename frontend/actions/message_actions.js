export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

export const receiveMessages = (messages) => {
  return {
    type: RECEIVE_MESSAGES,
    messages
  }
}