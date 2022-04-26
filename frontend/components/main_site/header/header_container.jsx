import { connect } from 'react-redux';
import Header from './header';

const mapState = (state, ownProps) => {
  const { users } = state.entities
  const { id } = state.session
  return {
    currentUser: users[id],
  }
}

export default connect(mapState, null)(Header);