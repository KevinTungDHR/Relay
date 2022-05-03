import { connect } from "react-redux";
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

export default connect(mapState, mapDispatch)(ClientSidebar)