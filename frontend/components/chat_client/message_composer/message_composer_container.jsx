import { connect } from "react-redux";
import { createDirectMessage } from "../../../actions/direct_message_action";
import { clearQuery, fetchSearchQuery } from "../../../actions/search_actions";
import MessageComposer from "./message_composer";

const mapState = (state, ownProps) => {
  return {
    queryChannels: Object.values(state.search.queryChannels),
    queryUsers: Object.values(state.search.queryUsers),
    workspaceId: ownProps.match.params.workspaceId,
  }
};


const mapDispatch = (dispatch) => {
  return {
    clearQuery: () => dispatch(clearQuery()),
    fetchSearchQuery: (workspaceId, query) => dispatch(fetchSearchQuery(workspaceId, query)),
    createDirectMessage: (directMessage) => dispatch(createDirectMessage(directMessage))
  }
}

export default connect(mapState, mapDispatch)(MessageComposer);