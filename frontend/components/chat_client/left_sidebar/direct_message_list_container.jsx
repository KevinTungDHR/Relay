import { connect } from 'react-redux';
import { showModal, hideModal } from '../../../actions/ui_actions';
import { withRouter } from 'react-router';
import DirectMessageList from './direct_messages_list';

const mapState = (state, ownProps) => {
  const { messageableId } = ownProps.match.params
  
  const directMessageId = messageableId ? messageableId.slice(1) : null

  return {
    directMessages: Object.values(state.entities.directMessages),
    directMessageId: directMessageId,
    modal: state.ui.modal
  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal())
  }
}

export default withRouter(connect(mapState, mapDispatch)(DirectMessageList));