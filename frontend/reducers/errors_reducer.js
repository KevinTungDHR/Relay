import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import workspaceErrorsReducer from "./workspace_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  workspaceErrors: workspaceErrorsReducer
})

export default errorsReducer;