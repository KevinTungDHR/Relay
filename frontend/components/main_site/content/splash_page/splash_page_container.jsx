import { connect } from 'react-redux';
import { login } from '../../../../actions/session_actions';
import SplashPage from './splash_page';
import { fetchSignedinWorkspaces } from '../../../../actions/workspace_actions';
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
    login: (user) => dispatch(login(user)),
    fetchSignedinWorkspaces: () => dispatch(fetchSignedinWorkspaces())
  }
}

export default connect(mapState, mapDispatch)(SplashPage);