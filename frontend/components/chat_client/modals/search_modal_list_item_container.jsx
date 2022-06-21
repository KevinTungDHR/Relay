import { connect } from "react-redux";
import { withRouter } from "react-router";
import { hideModal } from "../../../actions/ui_actions";
import { createDirectMessage } from "../../../util/direct_message_util";
import SearchModalListItem from "./search_modal_list_item";

const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  return {
    fullPath: pathname,
    url: url,
    workspaceId: ownProps.match.params.workspaceId
  }
}
const mapDispatch = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal()),
    createDirectMessage: (directMessage, done) => createDirectMessage(directMessage)
    .then((res) => done(`/client/${res.directMessage.workspaceId}/D${res.directMessage.id}/`))
  }
}

export default withRouter(connect(mapState, mapDispatch)(SearchModalListItem));