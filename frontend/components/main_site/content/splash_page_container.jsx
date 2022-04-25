import { connect } from 'react-redux';
import { login } from '../../../actions/session_actions';
import SplashPage from './splash_page';

const mapState = (state) => {
  const { users } = state.entities
  const { id } = state.session
  return {
    currentUser: users[id],
  }
}

const mapDispatch = (dispatch) => {
  return {
    login: (user) => dispatch(login(user))
  }
}

export default connect(mapState, mapDispatch)(SplashPage);