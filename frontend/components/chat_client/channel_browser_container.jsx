import { connect } from 'react-redux';
import { fetchChannelsSearch } from '../../actions/search_actions';
import { showModal } from '../../actions/ui_actions';
import ChannelBrowser from './channel_browser';

const mapState = (state) => {
  return{
    browserChannels: Object.values(state.search.browserChannels)
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const { workspaceId } = ownProps.match.params
  return {
    fetchChannelsSearch: () => dispatch(fetchChannelsSearch(workspaceId)),
    showModal: (modal) => dispatch(showModal(modal)),
    
  }
}

export default connect(mapState, mapDispatch)(ChannelBrowser);