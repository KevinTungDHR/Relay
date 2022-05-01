import { connect } from 'react-redux';
import { fetchChannelsSearch } from '../../actions/search_actions';
import ChannelBrowserItem from './channel_browser_item';
import { withRouter } from 'react-router';

const mapState = (state) => {
  return{
    myChannels: state.entities.channels
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const { workspaceId } = ownProps.match.params
  return {
    fetchChannelsSearch: () => dispatch(fetchChannelsSearch(workspaceId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ChannelBrowserItem));