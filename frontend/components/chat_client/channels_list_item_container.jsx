import { connect } from 'react-redux';
import { receiveUser } from '../../actions/user_actions';
import { receiveMessage } from '../../actions/message_actions';
import ChannelsListItem from './channels_list_item';
import { receiveStatus } from '../../actions/status_action';


const mapDispatch = (dispatch) => {
  return {
    receiveUser: (user) => dispatch(receiveUser(user)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
    receiveStatus: (status) => dispatch(receiveStatus(status))
  }
}

export default connect(null, mapDispatch)(ChannelsListItem);


    