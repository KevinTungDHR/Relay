import { connect } from 'react-redux';
import ChannelMessageItem from './channel_message_item';

const mapState = (state) => {
  return {
    users: state.entities.users
  }
}


export default connect(mapState, null)(ChannelMessageItem)