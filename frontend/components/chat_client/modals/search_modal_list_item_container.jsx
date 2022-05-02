import { connect } from "react-redux";
import { withRouter } from "react-router";
import { hideModal } from "../../../actions/ui_actions";
import SearchModalListItem from "./search_modal_list_item";

const mapDispatch = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal())
  }
}

export default withRouter(connect(null, mapDispatch)(SearchModalListItem));