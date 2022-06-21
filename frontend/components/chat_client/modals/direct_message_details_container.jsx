import { connect } from 'react-redux';
import { hideModal, showModal } from '../../../actions/ui_actions';
import { withRouter } from 'react-router';
import { addMembers } from '../../../actions/channel_actions';
import DirectMessageDetails from './direct_message_details';
import { fetchDirectMessage } from '../../../actions/direct_message_action';

const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  const { messageableId } = ownProps.match.params
  return {
    redirectLink: state.redirect,
    fullPath: pathname,
    url: url,
    modal: state.ui.modal,
    users: state.entities.users,
    directMessages: state.entities.directMessages,
    subscriptions: state.entities.subscriptions,
    subscriptionsArr: Object.values(state.entities.subscriptions),
    directMessageId: messageableId,
    sessionId: state.session.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal()),
    fetchDirectMessage: (directMessageId) => dispatch(fetchDirectMessage(directMessageId)), 
    addMembers: ({channelId, members, allMembers}) => dispatch(addMembers(channelId, members, allMembers))
  }
}

export default withRouter(connect(mapState, mapDispatch)(DirectMessageDetails));