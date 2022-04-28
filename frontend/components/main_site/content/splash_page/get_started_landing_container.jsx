import { connect } from 'react-redux';
import { logout } from '../../../../actions/session_actions';
import { createWorkspace, fetchSignedinWorkspaces } from '../../../../actions/workspace_actions';
import GetStartedLanding from './get_started_landing';

const mapState = (state) => {
  const { users } = state.entities
  const { id } = state.session
  return {
    currentUser: users[id],
    workspaces: Object.values(state.entities.workspaces)
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSignedinWorkspaces: () => dispatch(fetchSignedinWorkspaces()),
    createWorkspace: () => dispatch(createWorkspace()),
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(GetStartedLanding);