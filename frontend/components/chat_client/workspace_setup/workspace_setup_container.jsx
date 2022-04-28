import { connect } from "react-redux";
import { fetchSignedinWorkspaces, updateWorkspace } from "../../../actions/workspace_actions";
import WorkspaceSetup from "./workspace_setup";

const mapState = (state, ownProps) => {
  const { users } = state.entities
  const { id } = state.session
  return {
    currentUser: users[id],
    currentWorkspace: state.entities.workspaces[ownProps.match.params.workspaceId],
    workspaces: Object.values(state.entities.workspaces)
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateWorkspace: (workspace) => dispatch(updateWorkspace(workspace)),
    fetchSignedinWorkspaces: () => dispatch(fetchSignedinWorkspaces())
  }
}

export default connect(mapState, mapDispatch)(WorkspaceSetup)

