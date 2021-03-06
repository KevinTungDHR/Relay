import { connect } from "react-redux";
import { clearQuery, fetchSearchQuery, receiveQuery } from "../../../actions/search_actions";
import { withRouter } from "react-router";
import SearchModal from "./search_modal";
import { hideModal } from "../../../actions/ui_actions";

const mapState = (state) => {
  return {
    queryChannels: Object.values(state.search.queryChannels),
    queryUsers: Object.values(state.search.queryUsers),
    query: state.search.query,
  }
}

const mapDispatch = (dispatch) => {
  return {
    receiveQuery: (query) => dispatch(receiveQuery(query)),
    clearQuery: () => dispatch(clearQuery()),
    hideModal: () => dispatch(hideModal()),
    fetchSearchQuery: (workspaceId, query) => dispatch(fetchSearchQuery(workspaceId, query))
  }
}

export default withRouter(connect(mapState, mapDispatch)(SearchModal));