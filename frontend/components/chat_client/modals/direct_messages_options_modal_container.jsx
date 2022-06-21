import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { closeDirectMessage } from '../../../actions/direct_message_action';
import { hideModal, showModal } from '../../../actions/ui_actions';
import DirectMessagesOptionsModal from './direct_messages_options_modal';

const mapState =  (state, ownProps) => {
  const { messageableId } = ownProps.match.params

  return {
    modal: state.ui.modal,
    directMessages: state.entities.directMessages,
    directMessageId: messageableId,
  }
}
const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal()),
    closeDirectMessage: (directMessageId) => dispatch(closeDirectMessage(directMessageId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(DirectMessagesOptionsModal));