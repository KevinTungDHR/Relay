import { connect } from 'react-redux';
import { receiveUser } from '../../../actions/user_actions';
import { receiveMessage } from '../../../actions/message_actions';
import ChannelsListItem from './channels_list_item';
import { receiveStatus } from '../../../actions/status_action';
import { withRouter } from 'react-router';
import { showModal } from '../../../actions/ui_actions';

const mapState = (state, ownProps) => {
  const { pathname } = ownProps.location
  const { url } = ownProps.match
  const { messageableId } = ownProps.match.params
  const channelId = messageableId ? messageableId : null
  return {
    fullPath: pathname,
    url: url,
    channelId: channelId
  }
}

const mapDispatch = (dispatch) => {
  return {
    receiveUser: (user) => dispatch(receiveUser(user)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
    receiveStatus: (status) => dispatch(receiveStatus(status)),
    showModal: (modal) => dispatch(showModal(modal))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ChannelsListItem));


    