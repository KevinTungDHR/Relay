import { connect } from 'react-redux';
import { updateChannel } from '../../../actions/channel_actions';
import EditChannelDescription from './edit_channel_description';

const mapState = state => {
  return {
    channels: state.entities.channels,
    modal: state.ui.modal
  }
}
const mapDispatch = (dispatch) => {
  return {
    updateChannel: (formChannel) => (dispatch(updateChannel(formChannel)))
  }
}

export default connect(mapState, mapDispatch)(EditChannelDescription)