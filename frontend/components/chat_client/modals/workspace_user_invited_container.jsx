import { connect } from "react-redux"
import { hideModal, showModal } from "../../../actions/ui_actions"
import WorkspaceUserInvited from "./workspace_user_invited";

const mapDispatch = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal()),
  }
}

export default connect(null, mapDispatch)(WorkspaceUserInvited);