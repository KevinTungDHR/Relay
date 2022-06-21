import { connect } from "react-redux"
import { withRouter } from "react-router"
import AllDMListItem from "./all_dm_list_item"

const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  return {
    messages: state.entities.messages,
    users: state.entities.users,
    subscriptions: state.entities.subscriptions,
    sessionId: state.session.id,
    fullPath: pathname,
    url: url
  }
}

export default withRouter(connect(mapState, null)(AllDMListItem));