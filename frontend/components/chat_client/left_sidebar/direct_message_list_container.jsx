import { connect } from 'react-redux';
import { showModal, hideModal } from '../../../actions/ui_actions';
import { withRouter } from 'react-router';
import DirectMessageList from './direct_messages_list';

const mapState = (state, ownProps) => {
  const { messageableId } = ownProps.match.params
  
  return {
    directMessages: Object.values(state.entities.directMessages),
    directMessageId: messageableId,
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