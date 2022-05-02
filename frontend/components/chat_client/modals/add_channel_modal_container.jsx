import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { hideModal, showModal } from '../../../actions/ui_actions';
import AddChannelModal from './add_channel_modal';

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal())
  }
}

export default withRouter(connect(null, mapDispatch)(AddChannelModal));