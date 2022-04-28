import { connect } from "react-redux";
import { fetchSignedinWorkspaces, fetchWorkspace } from "../../actions/workspace_actions";
import ChatClient from "./chat_client";

const mapState = (state, ownProps) => {
  const { workspaces, users } = state.entities
  return {
    users: users,
    workspaces: workspaces,
    currentWorkspace: workspaces[ownProps.match.params.workspaceId]
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSignedinWorkspaces: () => dispatch(fetchSignedinWorkspaces()),
    fetchWorkspace: (workspaceId) => dispatch(fetchWorkspace(workspaceId))
  }
}

export default connect(mapState, mapDispatch)(ChatClient);