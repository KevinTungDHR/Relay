import { connect } from 'react-redux';
import { updateChannel } from '../../../actions/channel_actions';
import EditChannelName from './edit_channel_name';

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

export default connect(mapState, mapDispatch)(EditChannelName)