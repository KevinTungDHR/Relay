import { connect } from "react-redux"
import { fetchAllDMs } from "../../../actions/direct_message_action"
import { clearQuery, fetchSearchMembers } from "../../../actions/search_actions"
import AllDirectMessages from "./all_direct_messages"

const mapState = (state, ownProps) => {
  return {
    queryUsers: Object.values(state.search.queryUsers),
    workspaceId: ownProps.match.params.workspaceId,
    directMessages: Object.values(state.entities.directMessages)
  }
}

const mapDispatch = (dispatch) => {
  return {
    clearQuery: () => dispatch(clearQuery()),
    fetchSearchMembers: (workspaceId, query) => dispatch(fetchSearchMembers(workspaceId, query)),
    fetchAllDMs: (workspaceId) => dispatch(fetchAllDMs(workspaceId))
  }
}

export default connect(mapState, mapDispatch)(AllDirectMessages);