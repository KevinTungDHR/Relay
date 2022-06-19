import { connect } from "react-redux";
import { withRouter } from "react-router";
import { clearQuery, fetchSearchMembers } from "../../../actions/search_actions";
import { createDirectMessage } from "../../../util/direct_message_util";
import AddDmMemberModal from "./add_dm_member_modal"; 

const mapState = (state, ownProps) => {
  return {
    queryUsers: Object.values(state.search.queryUsers),
    workspaceId: ownProps.match.params.workspaceId,
  }
}

const mapDispatch = (dispatch) => {
  return {
    clearQuery: () => dispatch(clearQuery()),
    fetchSearchMembers: (workspaceId, query) => dispatch(fetchSearchMembers(workspaceId, query)),
    createDirectMessage: (directMessage, done) => dispatch(createDirectMessage(directMessage))
      .then((res) => done(`/client/${res.directMessage.workspaceId}/D${res.directMessage.id}/`))
  }
}

export default withRouter(connect(mapState, mapDispatch)(AddDmMemberModal));