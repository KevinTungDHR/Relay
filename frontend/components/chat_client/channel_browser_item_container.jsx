import { connect } from 'react-redux';
import { fetchChannelsSearch } from '../../actions/search_actions';
import ChannelBrowserItem from './channel_browser_item';
import { withRouter } from 'react-router';
import { joinChannel, leaveChannel } from '../../actions/channel_actions';

const mapState = (state) => {
  return{
    myChannels: state.entities.channels
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const { workspaceId } = ownProps.match.params
  return {
    fetchChannelsSearch: () => dispatch(fetchChannelsSearch(workspaceId)),
    joinChannel: (channelId) => dispatch(joinChannel(channelId)),
    leaveChannel: (channelId) => dispatch(leaveChannel(channelId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ChannelBrowserItem));