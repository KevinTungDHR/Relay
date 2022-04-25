import { connect } from 'react-redux';
import { logout, login } from '../../../actions/session_actions';
import SessionLinks from './session_links';

const mapState = (state, ownProps) => {
  const { users } = state.entities
  const { id } = state.session
  return {
    currentUser: users[id],
    errors: state.errors.session,
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    login: (user) => dispatch(login(user))
  }
}

export default connect(mapState, mapDispatch)(SessionLinks);