import * as ChannelsAPIUtil from '../util/channels_util';
import * as SearchAPIUtil from '../util/search_util';
export const RECEIVE_CHANNEL_BROWSER_SEARCH = 'RECEIVE_CHANNEL_BROWSER_SEARCH';
export const RECEIVE_SEARCH_CHANNELS = 'RECEIVE_SEARCH_CHANNELS';
export const RECEIVE_SEARCH_USERS = 'RECEIVE_SEARCH_USERS';
export const RECEIVE_QUERY = 'RECEIVE_QUERY';
export const CLEAR_QUERY = 'CLEAR_QUERY';

const receiveChannelBrowserSearch = (channels) => {
  return {
    type: RECEIVE_CHANNEL_BROWSER_SEARCH,
    channels
  }
}

const receiveSearchChannels = (channels) => {
  return {
    type: RECEIVE_SEARCH_CHANNELS,
    channels
  }
}

const receiveSearchUsers = (users) => {
  return {
    type: RECEIVE_SEARCH_USERS,
    users
  }
}

export const receiveQuery = (query) => {
  return {
    type: RECEIVE_QUERY,
    query
  }
}

export const clearQuery = () => {
  return {
    type: CLEAR_QUERY,
  }
}

export const fetchBrowserChannels = (workspaceId) => (dispatch) => {
  return ChannelsAPIUtil.fetchBrowserChannels(workspaceId)
    .then(channels => dispatch(receiveChannelBrowserSearch(channels)))
}

export const fetchSearchQuery = (workspaceId, query) => dispatch => {
  return SearchAPIUtil.fetchSearchQuery(workspaceId, query)
    .then(({channels, users}) => {
      dispatch(receiveSearchChannels(channels))
      dispatch(receiveSearchUsers(users))
    })
}