import * as DirectMessageAPI from '../util/direct_message_util';

// Temp Fix
export const RECEIVE_ALL_DIRECT_MESSAGES = "RECEIVE_ALL_DIRECT_MESSAGES";
export const RECEIVE_DIRECT_MESSAGES = "RECEIVE_DIRECT_MESSAGES";
export const RECEIVE_DIRECT_MESSAGE = "RECEIVE_DIRECT_MESSAGE";
export const REMOVE_DIRECT_MESSAGE = "REMOVE_DIRECT_MESSAGE";


export const receiveDirectMessages = (directMessages) => {
  return {
    type: RECEIVE_DIRECT_MESSAGES,
    directMessages
  }
}

export const receiveAllDirectMessages = (directMessages) => {
  return {
    type: RECEIVE_ALL_DIRECT_MESSAGES,
    ...directMessages
  }
}

export const receiveDirectMessage = (directMessage) => {
  return {
    type: RECEIVE_DIRECT_MESSAGE,
    ...directMessage
  }
}

export const removeDirectMessage = (directMessageId) => {
  return {
    type: REMOVE_DIRECT_MESSAGE,
    directMessageId
  }
}

export const fetchDirectMessage = (dmId) => dispatch => {
  return DirectMessageAPI.fetchDirectMessage(dmId)
    .then((directMessage) => {
      dispatch(receiveDirectMessage(directMessage))
    })
    // .fail((errors) => dispatch(receiveChannelErrors(errors.responseJSON)))
}

export const createDirectMessage = (directMessage) => (dispatch) => {
  return DirectMessageAPI.createDirectMessage(directMessage)
    .then((directMessage) => {
      return dispatch(receiveDirectMessage(directMessage))
    })
}

export const closeDirectMessage = (directMessageId) => (dispatch) => {
  return DirectMessageAPI.closeDirectMessage(directMessageId)
    .then(() => {
      return dispatch(removeDirectMessage(directMessageId))
    })
}

export const fetchAllDMs = (workspaceId) => (dispatch) => {
  return DirectMessageAPI.fetchAllDMs(workspaceId)
    .then((data) => {
      return dispatch(receiveAllDirectMessages(data))
    })
}