import { connect } from 'react-redux';
import { showModal, hideModal } from '../../../actions/ui_actions';
import { withRouter } from 'react-router';
import DirectMessageList from './direct_messages_list';
import { closeDirectMessage } from '../../../actions/direct_message_action';

const mapState = (state, ownProps) => {
  const { messageableId } = ownProps.match.params
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  return {
    directMessages: Object.values(state.entities.directMessages),
    directMessageId: messageableId,
    modal: state.ui.modal,
    fullPath: pathname,
    url: url
  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal())
  }
}

export default withRouter(connect(mapState, mapDispatch)(DirectMessageList));