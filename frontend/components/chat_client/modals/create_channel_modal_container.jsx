import { connect } from 'react-redux';
import { hideModal, showModal } from '../../../actions/ui_actions';
import CreateChannelModal from './create_channel_modal';

const mapState = (state) => {
  return {
    
  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal())
  }
}

export default connect(mapState, mapDispatch)(CreateChannelModal);