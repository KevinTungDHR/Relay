import { connect } from "react-redux"
import { clearQuery, fetchSearchMembers } from "../../../actions/search_actions"
import AllDirectMessages from "./all_direct_messages"

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
  }
}

export default connect(mapState, mapDispatch)(AllDirectMessages);