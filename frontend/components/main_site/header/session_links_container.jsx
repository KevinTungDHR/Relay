import { connect } from 'react-redux';
import { logout, login } from '../../../actions/session_actions';
import { withRouter } from 'react-router';
import SessionLinks from './session_links';
import { fetchPendingWorkspaces } from '../../../actions/workspace_actions';

const mapState = (state) => {
  const { users } = state.entities
  const { id } = state.session
  return {
    currentUser: users[id],
    workspaces: Object.values(state.entities.workspaces),
    errors: state.errors.session,
    pendingWorkspaces: state.entities.pendingWorkspaces,
    subscriptions: state.entities.subscriptions
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    login: (user) => dispatch(login(user)),
    fetchPendingWorkspaces: () => dispatch(fetchPendingWorkspaces())
  }
}

export default withRouter(connect(mapState, mapDispatch)(SessionLinks));