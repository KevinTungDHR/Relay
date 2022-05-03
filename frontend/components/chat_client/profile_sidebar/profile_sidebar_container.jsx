import { connect } from 'react-redux';
import { hideSecondary, showSecondary } from '../../../actions/ui_actions';
import ProfileSidebar from './profile_sidebar';

const mapState = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.match.params.userId]
  }
}

const mapDispatch = dispatch => {
  return {
    showSecondary: (secondary) => dispatch(showSecondary(secondary)),
    hideSecondary: () => dispatch(hideSecondary())
  }
}

export default connect(mapState, mapDispatch)(ProfileSidebar);