import { connect } from "react-redux";
import { withRouter } from "react-router";
import { hideModal } from "../../../actions/ui_actions";
import ChannelDetailsUserItem from "./channel_details_user_item";

const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  return {
    fullPath: pathname,
    url: url
  }
}
const mapDispatch = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal())
  }
}

export default withRouter(connect(mapState, mapDispatch)(ChannelDetailsUserItem));