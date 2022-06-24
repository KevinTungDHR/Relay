import { connect } from "react-redux"
import { acceptWorkspaceInvite, declineWorkspaceInvite } from "../../../actions/workspace_actions";
import PendingWorkspaceItem from "./pending_workspace_item"

const mapDispatch = (dispatch) => {
  return {
    acceptWorkspaceInvite: (workspaceId) => dispatch(acceptWorkspaceInvite(workspaceId)),
    declineWorkspaceInvite: (workspaceId) => dispatch(declineWorkspaceInvite(workspaceId))
  }
}

export default connect(null, mapDispatch)(PendingWorkspaceItem);