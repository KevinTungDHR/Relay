import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChannelMessageItem from './channel_message_item';

const mapState = (state) => {
  return {
    users: state.entities.users,
    sessionId: state.session.id
  }
}


export default withRouter(connect(mapState, null)(ChannelMessageItem));