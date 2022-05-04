import * as ChannelsAPIUtil from "../util/channels_util";
import { redirect } from "./redirect_action";
import { receiveSubscription, removeSubscription } from "./subscription_actions";
import { receiveMessages } from "./message_actions";
import { receiveChannelUsers } from "./user_actions";
import { batch } from 'react-redux'
export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS";

export const receiveChannels = (channels) => {
  return {
    type: RECEIVE_CHANNELS,
    channels
  }
}

export const receiveChannel = (channel) => {
  return {
    type: RECEIVE_CHANNEL,
    channel
  }
}

export const removeChannel = (channelId) => {
  return {
    type: REMOVE_CHANNEL,
    channelId
  }
}

const receiveChannelErrors = (errors) => {
  return {
    type: RECEIVE_CHANNEL_ERRORS,
    errors
  }
}

export const fetchChannel = (channelId) => dispatch => {
  return ChannelsAPIUtil.fetchChannel(channelId)
    .then(({channel, subscription, messages, users}) => {
      batch(() => {
        dispatch(receiveChannel(channel))
        dispatch(receiveSubscription(subscription))
        dispatch(receiveMessages(messages))
        dispatch(receiveChannelUsers(users))
      })
    })
    .fail((errors) => dispatch(receiveChannelErrors(errors.responseJSON)))
}

export const createChannel = (formChannel) => dispatch => {
  return ChannelsAPIUtil.createChannel(formChannel)
    .then(({channel, subscription}) => {
      batch(() => {
        dispatch(receiveSubscription(subscription))
        dispatch(receiveChannel(channel))
        dispatch(redirect(`/client/${channel.workspaceId}/${channel.id}`))
      })
    })
    .fail((errors) => dispatch(receiveChannelErrors(errors.responseJSON)))
}

export const updateChannel = (formChannel) => dispatch => {
  return ChannelsAPIUtil.updateChannel(formChannel)
    .then(({channel, subscription}) => {
      batch(() => {
        dispatch(receiveChannel(channel))
        dispatch(receiveSubscription(subscription))
      })
    })
    .fail((errors) => dispatch(receiveChannelErrors(errors.responseJSON)))
}

export const deleteChannel = (channelId) => dispatch => {
  return ChannelsAPIUtil.deleteChannel(channelId)
    .then(({channel, subscription}) => {
      batch(() => {
        dispatch(removeChannel(channel.id))
        dispatch(removeSubscription(subscription.id))
      })
    })
    .fail((errors) => dispatch(receiveChannelErrors(errors.responseJSON)))
}

export const joinChannel = (channelId) => dispatch => {
  return ChannelsAPIUtil.joinChannel(channelId)
    .then(({channel, subscription}) => {
      dispatch(receiveChannel(channel))
      dispatch(receiveSubscription(subscription))
    }) 
    .fail(errors => dispatch(receiveChannelErrors(errors.responseJSON)))
}


export const leaveChannel = (channelId) => dispatch => {
  return ChannelsAPIUtil.leaveChannel(channelId)
    .then(({channel, subscription}) => {
      dispatch(removeChannel(channel.id))
      dispatch(removeSubscription(subscription.id))
    })
    .fail(errors => dispatch(receiveChannelErrors(errors.responseJSON)))
}