import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addMembers } from '../../../../actions/channel_actions';
import { clearQuery, fetchSearchMembers } from '../../../../actions/search_actions';
import { hideModal, showModal } from '../../../../actions/ui_actions';
import AddPeopleOncreateModal from './add_people_oncreate_modal';

const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  return {
    fullPath: pathname,
    url: url,
    modal: state.ui.modal,
    channels: state.entities.channels,
    queryUsers: Object.values(state.search.queryUsers),
  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal()),
    fetchSearchMembers: (workspaceId, query) => dispatch(fetchSearchMembers(workspaceId, query)),
    clearQuery: () => dispatch(clearQuery()),
    addMembers: (channelId, members) => dispatch(addMembers(channelId, members))
  }
}

export default withRouter(connect(mapState, mapDispatch)(AddPeopleOncreateModal));