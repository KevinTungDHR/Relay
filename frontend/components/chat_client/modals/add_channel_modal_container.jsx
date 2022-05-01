import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { showModal } from '../../../actions/ui_actions';
import AddChannelModal from './add_channel_modal';

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal))
  }
}

export default withRouter(connect(null, mapDispatch)(AddChannelModal));