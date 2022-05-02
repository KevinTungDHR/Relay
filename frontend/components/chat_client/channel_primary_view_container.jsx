import { connect } from "react-redux";
import { fetchChannel } from "../../actions/channel_actions";
import { createChannelMessage } from "../../util/messages_util";
import ChannelPrimaryView from "./channel_primary_view";


const mapState = (state, ownProps) => {
  return {
    messages: Object.values(state.entities.messages),
    channel: state.entities.channels[ownProps.match.params.channelId],
    users: Object.values(state.entities.users),
    isLoading: state.status.isLoading
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId)),
    createChannelMessage: (channelId, message) => createChannelMessage(channelId, message)
  }
}

export default connect(mapState, mapDispatch)(ChannelPrimaryView)