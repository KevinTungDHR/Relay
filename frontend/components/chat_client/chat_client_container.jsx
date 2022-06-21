import { connect } from "react-redux";
import { receiveDirectMessage } from "../../actions/direct_message_action";
import { hideModal } from "../../actions/ui_actions";
import { fetchSignedinWorkspaces, fetchWorkspace } from "../../actions/workspace_actions";
import ChatClient from "./chat_client";

const mapState = (state, ownProps) => {

  const { workspaces, users } = state.entities
  return {
    users: users,
    workspaces: workspaces,
    channels: state.entities.channels,
    currentWorkspace: workspaces[ownProps.match.params.workspaceId],
    workspaceId: ownProps.match.params.workspaceId,
    modal: state.ui.modal,
    secondary: state.ui.secondary,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSignedinWorkspaces: () => dispatch(fetchSignedinWorkspaces()),
    fetchWorkspace: (workspaceId) => dispatch(fetchWorkspace(workspaceId)),
    hideModal: () => dispatch(hideModal()),
    receiveDirectMessage: (directMessage) => dispatch(receiveDirectMessage(directMessage))
  }
}

export default connect(mapState, mapDispatch)(ChatClient);