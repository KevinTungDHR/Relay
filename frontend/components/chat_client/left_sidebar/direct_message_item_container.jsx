import { connect } from 'react-redux';
import { receiveUser } from '../../../actions/user_actions';
import { receiveMessage } from '../../../actions/message_actions';
import { withRouter } from 'react-router';
import { showModal } from '../../../actions/ui_actions';
import DirectMessageListItem from './direct_message_list_item';
import { closeDirectMessage } from '../../../actions/direct_message_action';

const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  const { messageableId } = ownProps.match.params
  return {
    fullPath: pathname,
    url: url,
    directMessageId: messageableId,
    subscriptions: state.entities.subscriptions,
    users: state.entities.users,
    sessionId: state.session.id,
    channels: state.entities.channels
  }
}

const mapDispatch = (dispatch) => {
  return {
    receiveUser: (user) => dispatch(receiveUser(user)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
    showModal: (modal) => dispatch(showModal(modal)),
    closeDirectMessage: (directMessageId) => dispatch(closeDirectMessage(directMessageId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(DirectMessageListItem));


    