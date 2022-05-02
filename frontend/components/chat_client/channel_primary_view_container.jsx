import { connect } from "react-redux";
import { fetchChannel } from "../../actions/channel_actions";
import ChannelPrimaryView from "./channel_primary_view";


const mapState = (state) => {
  return {
    messages: Object.values(state.entities.messages)
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId)) 
  }
}

export default connect(mapState, mapDispatch)(ChannelPrimaryView)