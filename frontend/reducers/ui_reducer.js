import { 
  SHOW_MODAL, 
  HIDE_MODAL 
} from "../actions/ui_actions";

const initialState = {
  modal: null
}

const uiReducer = (state = initialState, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch(action.type){
    case SHOW_MODAL:
      nextState['modal'] = action.modal
      return nextState
    case HIDE_MODAL:
      nextState['modal'] = null;
      return nextState;
    default:
      return state;
  }
}

export default uiReducer;