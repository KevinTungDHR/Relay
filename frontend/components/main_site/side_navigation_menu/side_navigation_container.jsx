import { connect } from "react-redux";
import { logout } from "../../../actions/session_actions";
import SideNavMenu from "./side_navigation_menu";

const mapState = (state) => {
  const { users } = state.entities
  const { id } = state.session
  return {
    currentUser: users[id],
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(SideNavMenu)