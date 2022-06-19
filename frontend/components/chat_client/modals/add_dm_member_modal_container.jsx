import { connect } from "react-redux";
import { createDirectMessage } from "../../../util/direct_message_util";
import AddDmMemberModal from "./add_dm_member_modal"; 

const mapState = (state, ownProps) => {
  return {
    queryUsers: Object.values(state.search.queryUsers),
    workspaceId: ownProps.match.params.workspaceId,
  }
}

const mapDispatch = (dispatch) => {
  return {
    createDirectMessage: (directMessage, done) => dispatch(createDirectMessage(directMessage))
      .then((res) => done(`/client/${res.directMessage.workspaceId}/D${res.directMessage.id}/`))
  }
}

export default connect(mapState, mapDispatch)(AddDmMemberModal);