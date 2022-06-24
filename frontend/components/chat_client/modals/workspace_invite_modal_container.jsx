import { connect } from "react-redux"
import { hideModal, showModal } from "../../../actions/ui_actions"
import { inviteToWorkspace } from "../../../actions/workspace_actions"
import WorkspaceInviteModal from "./workspace_invite_modal"


const mapState = (state, ownProps) => {
  return {
    workspace: state.ui.modal.workspace,
  }
}
const mapDispatch = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal()),
    showModal: (modal) => dispatch(showModal(modal)),
    inviteToWorkspace: (workspaceId, workspace) => dispatch(inviteToWorkspace(workspaceId, workspace))
  }
}

export default connect(mapState, mapDispatch)(WorkspaceInviteModal);