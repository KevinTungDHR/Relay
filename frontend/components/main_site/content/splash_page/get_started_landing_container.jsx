import { connect } from 'react-redux';
import { createWorkspace } from '../../../../actions/workspace_actions';
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
    createWorkspace: () => dispatch(createWorkspace())
  }
}

export default connect(mapState, mapDispatch)(GetStartedLanding);