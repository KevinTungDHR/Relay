import { connect } from 'react-redux';
import ChannelsList from './channels_list';
import { showModal, hideModal } from '../../../actions/ui_actions';
import { withRouter } from 'react-router';
const mapState = (state, ownProps) => {
  const { messageableId } = ownProps.match.params

  const channelId = messageableId ? messageableId: null

  return {
    channels: Object.values(state.entities.channels),
    channelId: channelId,
    modal: state.ui.modal
  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal())
  }
}

export default withRouter(connect(mapState, mapDispatch)(ChannelsList));