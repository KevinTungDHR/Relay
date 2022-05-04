import { connect } from 'react-redux';
import { showModal } from '../../../actions/ui_actions';
import ChannelOptionsModal from './channel_options_modal';

const mapState =  (state) => {
  return {
    channel: state.ui.modal.channel,
    modal: state.ui.modal
  }
}
const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal))
  }
}

export default connect(mapState, mapDispatch)(ChannelOptionsModal);