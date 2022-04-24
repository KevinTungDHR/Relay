import { connect } from 'react-redux';
import SessionForm from './session_form';
import { removeErrors, signup } from '../../../actions/session_actions';

const mapState = (state, ownProps) => {
  return {
    errors: state.errors.session,
    formType: 'Sign Up'
  }
}

const mapDispatch = (dispatch) => {
  return {
    processForm: (user) => dispatch(signup(user)),
    removeErrors: () => dispatch(removeErrors())
  }
}

export default connect(mapState, mapDispatch)(SessionForm);