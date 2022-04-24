import { connect } from 'react-redux';
import SessionForm from './session_form';
import { removeErrors, login } from '../../../actions/session_actions';

const mapState = (state, ownProps) => {
  return {
    errors: state.errors.session,
    formType: 'Sign In'
  }
}

const mapDispatch = (dispatch) => {
  return {
    processForm: (user) => dispatch(login(user)),
    removeErrors: () => dispatch(removeErrors())
  }
}

export default connect(mapState, mapDispatch)(SessionForm);