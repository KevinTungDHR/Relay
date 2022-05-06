import { connect } from "react-redux";
import { showModal } from "../../actions/ui_actions";
import { selectChannelMessages } from "../../selectors/message_selectors";
import { createChannelMessage } from "../../util/messages_util";
import { withRouter } from "react-router";
import { fetchDirectMessage } from "../../actions/direct_message_action";
import DirectMessagePrimaryView from "./direct_message_primary_view";

const mapState = (state, ownProps) => {
  const { messageableId } = ownProps.match.params
  const directMessageId = messageableId.slice(1)
  const dmSubs = Object.values(state.entities.subscriptions).filter(sub => sub.subscribeableId == directMessageId && sub.subscribeableType === "DirectMessage")
  return {
    messages: selectChannelMessages({ messages: state.entities.messages, channelId: directMessageId}),
    directMessage: state.entities.directMessages[directMessageId],
    directMessageId: directMessageId,
    dmSubs: dmSubs,
    users: Object.values(state.entities.users),
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