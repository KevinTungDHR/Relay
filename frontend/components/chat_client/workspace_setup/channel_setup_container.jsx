import { connect } from "react-redux";
import { createChannel } from "../../../actions/channel_actions";
import { fetchSignedinWorkspaces, fetchWorkspace, updateWorkspace } from "../../../actions/workspace_actions";
import ChannelSetup from "./channel_setup";

const mapState = (state, ownProps) => {
  const { users } = state.entities
  const { id } = state.session
  return {
    currentUser: users[id],
    currentWorkspace: state.entities.workspaces[ownProps.match.params.workspaceId],
    workspaceId: ownProps.match.params.workspaceId,
    channels: state.entities.channels,
    workspaces: Object.values(state.entities.workspaces),
    formType: "setupChannelName"
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateWorkspace: (workspace) => dispatch(updateWorkspace(workspace)),
    fetchSignedinWorkspaces: () => dispatch(fetchSignedinWorkspaces()),
    fetchWorkspace: (workspaceId) => dispatch(fetchWorkspace(workspaceId)),
    createChannel: (channel) => dispatch(createChannel(channel))
  }
}

export default connect(mapState, mapDispatch)(ChannelSetup)

