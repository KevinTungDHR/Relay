import { connect } from "react-redux";
import { withRouter } from "react-router";
import { hideModal, showModal } from "../../../actions/ui_actions";
import ClientSidebar from "./client_sidebar";

const mapState = (state) => {
  return {
    modal: state.ui.modal
  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal())
  }
}

export default withRouter(connect(mapState, mapDispatch)(ClientSidebar))