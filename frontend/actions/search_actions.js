import * as ChannelsAPIUtil from '../util/channels_util';
export const RECEIVE_CHANNEL_BROWSER_SEARCH = 'RECEIVE_CHANNEL_BROWSER_SEARCH';

const receiveChannelBrowserSearch = (channels) => {
  return {
    type: RECEIVE_CHANNEL_BROWSER_SEARCH,
    channels
  }
}

export const fetchChannelsSearch = (workspaceId) => (dispatch) => {
  return ChannelsAPIUtil.fetchChannelsSearch(workspaceId)
    .then(channels => dispatch(receiveChannelBrowserSearch(channels)))
}