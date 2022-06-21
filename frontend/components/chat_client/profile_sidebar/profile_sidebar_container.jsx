import { connect } from 'react-redux';
import { createDirectMessage } from '../../../actions/direct_message_action';
import { hideSecondary, showSecondary } from '../../../actions/ui_actions';
import ProfileSidebar from './profile_sidebar';

const mapState = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.match.params.userId],
    workspaceId: ownProps.match.params.workspaceId
  }
}

const mapDispatch = dispatch => {
  return {
    showSecondary: (secondary) => dispatch(showSecondary(secondary)),
    hideSecondary: () => dispatch(hideSecondary()),
    createDirectMessage: (directMessage, done) => dispatch(createDirectMessage(directMessage))
      .then((res) => done(`/client/${res.directMessage.workspaceId}/D${res.directMessage.id}/`))
  }
}

export default connect(mapState, mapDispatch)(ProfileSidebar);