export const RECEIVE_DIRECT_MESSAGES = "RECEIVE_DIRECT_MESSAGES";
export const RECEIVE_DIRECT_MESSAGE = "RECEIVE_DIRECT_MESSAGE";


export const receiveDirectMessages = (directMessages) => {
  return {
    type: RECEIVE_DIRECT_MESSAGES,
    directMessages
  }
}

export const receiveDirectMessage = (directMessage) => {
  return {
    type: RECEIVE_DIRECT_MESSAGE,
    directMessage
  }
}
