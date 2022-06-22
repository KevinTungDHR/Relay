import * as MessageAPIUtil from '../util/messages_util';

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const receiveMessages = (messages) => {
  return {
    type: RECEIVE_MESSAGES,
    messages
  }
}

export const receiveMessage = (message) => {
  return {
    type: RECEIVE_MESSAGE,
    message
  }
}

export const updateMessage = (message) => (dispatch) => {
  return MessageAPIUtil.updateMessage(message)
    .then((data) => dispatch(receiveMessage(data)))
}