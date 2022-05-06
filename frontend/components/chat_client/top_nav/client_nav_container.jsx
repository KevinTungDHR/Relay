import { connect } from 'react-redux';
import { showModal } from '../../../actions/ui_actions'
import ClientNav from './client_nav';
import { withRouter } from 'react-router';

const mapState = (state) => {
  return {
    sessionId: state.session.id
  }
}
const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ClientNav))