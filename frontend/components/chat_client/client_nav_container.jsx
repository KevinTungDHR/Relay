import { connect } from 'react-redux';
import { showModal } from '../../actions/ui_actions';
import ClientNav from './client_nav';

const mapState = (state) => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal))
  }
}

export default connect(mapState, mapDispatch)(ClientNav)