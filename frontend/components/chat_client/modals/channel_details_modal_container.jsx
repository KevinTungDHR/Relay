import { connect } from 'react-redux';
import { hideModal, showModal } from '../../../actions/ui_actions';
import { withRouter } from 'react-router';
import ChannelDetails from './channel_details_modal';
import { addMembers, deleteChannel, fetchChannel, leaveChannel } from '../../../actions/channel_actions';

const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  const { messageableId } = ownProps.match.params
  debugger
  return {
    redirectLink: state.redirect,
    fullPath: pathname,
    url: url,
    modal: state.ui.modal,
    users: state.entities.users,
    channels: state.entities.channels,
    subscriptions: Object.values(state.entities.subscriptions),
    channelId: messageableId,
  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal()),
    leaveChannel: (channelId) => dispatch(leaveChannel(channelId)),
    deleteChannel: (channelId) => dispatch(deleteChannel(channelId)),
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId)), 
    addMembers: ({channelId, members, allMembers}) => dispatch(addMembers(channelId, members, allMembers))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ChannelDetails));