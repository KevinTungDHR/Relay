import { connect } from 'react-redux';
import ChannelsList from './channels_list';

const mapState = (state, ownProps) => {
  return {
    channels: Object.values(state.entities.channels),
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(ChannelsList);