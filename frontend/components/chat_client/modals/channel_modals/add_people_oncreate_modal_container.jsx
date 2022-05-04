import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { hideModal, showModal } from '../../../../actions/ui_actions';
import AddPeopleOncreateModal from './add_people_oncreate_modal';

const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  return {
    fullPath: pathname,
    url: url,
    modal: state.ui.modal
  }
}

const mapDispatch = (dispatch) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal())
  }
}

export default withRouter(connect(mapState, mapDispatch)(AddPeopleOncreateModal));