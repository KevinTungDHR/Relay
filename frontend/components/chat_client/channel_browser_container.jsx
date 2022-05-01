import { connect } from 'react-redux';
import { fetchChannelsSearch } from '../../actions/search_actions';
import ChannelBrowser from './channel_browser';

const mapState = (state) => {
  return{
    browserChannels: Object.values(state.search.browserChannels)
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const { workspaceId } = ownProps.match.params
  return {
    fetchChannelsSearch: () => dispatch(fetchChannelsSearch(workspaceId))
  }
}

export default connect(mapState, mapDispatch)(ChannelBrowser);