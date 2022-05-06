import { connect } from "react-redux";
import { showModal } from "../../actions/ui_actions";
import { selectChannelMessages } from "../../selectors/message_selectors";
import { createChannelMessage } from "../../util/messages_util";
import { withRouter } from "react-router";
import { fetchDirectMessage } from "../../actions/direct_message_action";
import DirectMessagePrimaryView from "./direct_message_primary_view";

const mapState = (state, ownProps) => {
  const { directMessages, subscriptions } = state.entities
  const { messageableId } = ownProps.match.params
  const directMessageId = messageableId
  return {
    messages: selectChannelMessages({ messages: state.entities.messages, channelId: directMessageId}),
    directMessage: directMessages[directMessageId],
    directMessageId: directMessageId,
    subscriptions: subscriptions,
    users: state.entities.users,
    sessionId: state.session.id,
    isLoading: state.status.isLoading,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchDirectMessage: (dmId) => dispatch(fetchDirectMessage(dmId)),
    // createChannelMessage: (channelId, message) => createChannelMessage(channelId, message),
    showModal: (modal) => dispatch(showModal(modal))
  }
}

export default withRouter(connect(mapState, mapDispatch)(DirectMessagePrimaryView));