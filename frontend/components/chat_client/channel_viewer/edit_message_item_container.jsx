import { connect } from "react-redux"
import EditMessageItem from "./edit_message_item"
import { updateMessage } from "../../../actions/message_actions"

const mapDispatch = (dispatch) => {
  return {
    updateMessage: (message) => dispatch(updateMessage(message))
  }
}

export default connect(null, mapDispatch)(EditMessageItem);