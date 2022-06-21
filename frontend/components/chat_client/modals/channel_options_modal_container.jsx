import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { leaveChannel } from '../../../actions/channel_actions';
import { hideModal, showModal } from '../../../actions/ui_actions';
import ChannelOptionsModal from './channel_options_modal';

const mapState =  (state, ownProps) => {
  const { messageableId } = ownProps.match.params

  return {
    channel: state.ui.modal.channel,
    modal: state.ui.modal,
    channels: state.entities.channels,
    channelId: messageableId,
  }
}
const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal()),
    leaveChannel: (channelId) => dispatch(leaveChannel(channelId)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(ChannelOptionsModal));