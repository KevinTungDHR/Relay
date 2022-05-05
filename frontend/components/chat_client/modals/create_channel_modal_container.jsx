import { connect } from 'react-redux';
import { createChannel } from '../../../actions/channel_actions';
import { hideModal, showModal } from '../../../actions/ui_actions';
import CreateChannelModal from './create_channel_modal';
import { withRouter } from 'react-router';

const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  const { messageableId } = ownProps.match.params
  const channelId = messageableId.slice(1)
  return {
    redirectLink: state.redirect,
    fullPath: pathname,
    url: url, 
    channelId: channelId
  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal()),
    createChannel: (channel) => dispatch(createChannel(channel))
  }
}

export default withRouter(connect(mapState, mapDispatch)(CreateChannelModal));