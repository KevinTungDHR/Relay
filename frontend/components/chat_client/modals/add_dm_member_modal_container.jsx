import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createDirectMessage } from "../../../actions/direct_message_action";
import { clearQuery, fetchSearchMembers } from "../../../actions/search_actions";
import { hideModal } from "../../../actions/ui_actions";
import AddDmMemberModal from "./add_dm_member_modal"; 

const mapState = (state, ownProps) => {
  return {
    queryUsers: Object.values(state.search.queryUsers),
    workspaceId: ownProps.match.params.workspaceId,
    subscriptions: state.entities.subscriptions,
    directMessages: state.entities.directMessages,
    directMessageId: ownProps.match.params.messageableId
  }
}

const mapDispatch = (dispatch) => {
  return {
    clearQuery: () => dispatch(clearQuery()),
    closeParentModal: () => dispatch(hideModal()),
    fetchSearchMembers: (workspaceId, query) => dispatch(fetchSearchMembers(workspaceId, query)),
    createDirectMessage: (directMessage, done) => dispatch(createDirectMessage(directMessage))
      .then((res) => done(`/client/${res.directMessage.workspaceId}/D${res.directMessage.id}/`))
  }
}

export default withRouter(connect(mapState, mapDispatch)(AddDmMemberModal));