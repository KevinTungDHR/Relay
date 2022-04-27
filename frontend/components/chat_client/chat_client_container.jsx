import { connect } from "react-redux";
import ChatClient from './chat_client';

const mapState = (state, ownProps) => {
  return {
    users: state.entities.users,
    workspaces: state.entities.workspaces

  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSignedinWorkspaces: () => dispatch(fetchSignedinWorkspaces()),
  }
}

export default connect(mapState, mapDispatch)(ChatClient);