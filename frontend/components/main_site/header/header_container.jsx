import { connect } from 'react-redux';
import Header from './header';
import { withRouter } from 'react-router';
const mapState = (state, ownProps) => {
  const { users } = state.entities
  const { id } = state.session
  return {
    currentUser: users[id],
  }
}

export default withRouter(connect(mapState, null)(Header));