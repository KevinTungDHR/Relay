import { connect } from 'react-redux';
import { hideModal, showModal } from '../../../actions/ui_actions';
import { withRouter } from 'react-router';
import ChannelDetails from './channel_details_modal';
import { leaveChannel } from '../../../actions/channel_actions';


const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  return {
    redirectLink: state.redirect,
    fullPath: pathname,
    url: url,
    modal: state.ui.modal,
    users: state.entities.users,
    channels: state.entities.channels
  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal()),
    leaveChannel: (channelId) => dispatch(leaveChannel(channelId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ChannelDetails));