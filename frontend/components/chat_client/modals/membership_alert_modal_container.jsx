import { connect } from "react-redux"
import { hideModal } from "../../../actions/ui_actions"
import MembershipAlertModal from "./membership_alert_modal"

const mapDispatch = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal())
  }
}

export default connect(null, mapDispatch)(MembershipAlertModal);