import { connect } from "react-redux";
import { clearQuery, fetchSearchQuery } from "../../../actions/search_actions";
import { createDirectMessage } from "../../../util/direct_message_util";
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
    createDirectMessage: (directMessage, done) => createDirectMessage(directMessage)
    .then((res) => done(`/client/${res.directMessage.workspaceId}/D${res.directMessage.id}/`))
  }
}

export default connect(mapState, mapDispatch)(MessageComposer);