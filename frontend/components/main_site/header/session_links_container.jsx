import { connect } from 'react-redux';
import { logout, login } from '../../../actions/session_actions';
import { withRouter } from 'react-router';
import SessionLinks from './session_links';

const mapState = (state) => {
  const { users } = state.entities
  const { id } = state.session
  return {
    currentUser: users[id],
    workspaces: state.entities.workspaces,
    errors: state.errors.session,
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    login: (user) => dispatch(login(user)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(SessionLinks));