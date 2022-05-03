import * as MessageAPIUtil from '../util/messages_util';
import { receiveStatus } from './status_action';
import { receiveUser } from './user_actions';
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

// export const createChannelMessage = (channelId, formMessage) => (dispatch) => {
//   return MessageAPIUtil.createChannelMessage(channelId, formMessage)
//     .then(({message, user}) => {
//       dispatch(receiveStatus(true))
//       dispatch(receiveMessage(message))
//       dispatch(receiveUser(user))
//     })
//     .then(() => dispatch(receiveStatus(false)))

// }
