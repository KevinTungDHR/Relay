import { combineReducers } from "redux";
import entitiesReducer from "./entitites_reducer";
import errorsReducer from "./errors_reducer";
import sessionReducer from "./session_reducer";
import { REMOVE_CURRENT_USER } from "../actions/session_actions";
import uiReducer from "./ui_reducer";
import searchReducer from "./search_reducer";
import redirectReducer from "./redirect_reducer";
import statusReducer from "./status_reducer";

const appReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer,
  search: searchReducer,
  ui: uiReducer,
  status: statusReducer,
  redirect: redirectReducer
})
const rootReducer = (state, action) => {
  if(action.type === REMOVE_CURRENT_USER){
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer;