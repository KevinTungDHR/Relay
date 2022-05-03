import { connect } from 'react-redux';
import ChannelMessageItem from './channel_message_item';

const mapState = (state) => {
  return {
    users: state.entities.users
  }
}

// const mapDispatch = (dispatch) => {
// }

export default connect(mapState, null)(ChannelMessageItem)