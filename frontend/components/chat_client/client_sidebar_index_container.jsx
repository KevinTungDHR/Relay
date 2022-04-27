import { connect } from "react-redux";
import { fetchSignedinWorkspaces, fetchWorkspace } from "../../actions/workspace_actions";
import ClientSidebarIndex from "./client_sidebar_index";

const mapState = (state, ownProps) => {
  return {
    users: state.entities.users,
    workspaces: state.entities.workspaces
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSignedinWorkspaces: () => dispatch(fetchSignedinWorkspaces()),
    fetchWorkspace: (workspaceId) => dispatch(fetchWorkspace(workspaceId))
  }
}

export default connect(mapState, mapDispatch)(ClientSidebarIndex);