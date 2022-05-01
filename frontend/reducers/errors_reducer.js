import { combineReducers } from "redux";
import channelErrorsReducer from "./channel_errors_reducer";
import sessionErrorsReducer from "./session_errors_reducer";
import workspaceErrorsReducer from "./workspace_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  workspaceErrors: workspaceErrorsReducer,
  channelErrors: channelErrorsReducer
})

export default errorsReducer;