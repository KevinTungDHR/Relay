import { connect } from 'react-redux';
import { showModal } from '../../../actions/ui_actions'
import ClientNav from './client_nav';
import { withRouter } from 'react-router';

const mapState = (state, ownProps) => {

  return {
    workspaces: state.entities.workspaces,
    sessionId: state.session.id,
    workspaceId: ownProps.match.params.workspaceId
  }
}
const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ClientNav))