import { connect } from "react-redux";
import { fetchChannel } from "../../../actions/channel_actions";
import { showModal } from "../../../actions/ui_actions";
import { selectChannelMessages } from "../../../selectors/message_selectors";
import { createChannelMessage } from "../../../util/messages_util";
import ChannelPrimaryView from "./channel_primary_view";


const mapState = (state, ownProps) => {
  const { channelId } = ownProps.match.params
  return {
    messages: selectChannelMessages({ messages: state.entities.messages, channelId: channelId}),
    channel: state.entities.channels[channelId],
    channelId: channelId,
    channelSubs: state.entities.channels[channelId].subscriptionIds,
    users: Object.values(state.entities.users),
    isLoading: state.status.isLoading,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId)),
    createChannelMessage: (channelId, message) => createChannelMessage(channelId, message),
    showModal: (modal) => dispatch(showModal(modal))
  }
}

export default connect(mapState, mapDispatch)(ChannelPrimaryView)