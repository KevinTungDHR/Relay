import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../../../actions/session_actions';
import { showModal } from '../../../actions/ui_actions';
import { createWorkspace } from '../../../actions/workspace_actions';
import WorkspaceMenu from './workspace_menu';

const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  return {
    workspaces: state.entities.workspaces,
    workspaceId: ownProps.match.params.workspaceId,
    users: state.entities.users,
    fullPath: pathname,
    url: url,
    modal: state.ui.modal,
  }
}

const mapDispatch = (dispatch) => { 
  return {
    createWorkspace: () => dispatch(createWorkspace()),
    showModal: (modalObj) => dispatch(showModal(modalObj)),
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(mapState, mapDispatch)(WorkspaceMenu));