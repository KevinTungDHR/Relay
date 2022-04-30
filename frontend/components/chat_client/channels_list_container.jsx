import { connect } from 'react-redux';
import ChannelsList from './channels_list';
import { showModal, hideModal } from '../../actions/ui_actions';
const mapState = (state, ownProps) => {
  return {
    channels: Object.values(state.entities.channels),
    modal: state.ui.modal
  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal())
  }
}

export default connect(mapState, mapDispatch)(ChannelsList);