import { 
  SHOW_MODAL, 
  HIDE_MODAL,
  SHOW_SECONDARY,
  HIDE_SECONDARY
} from "../actions/ui_actions";

const initialState = {
  modal: null,
  secondary: {
    open: false,
    window: null
  }
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
    case SHOW_SECONDARY:
      nextState['secondary'] = action.secondary
      return nextState;
    case HIDE_SECONDARY:
      nextState['secondary'] = {  open: false, window: null };
      return nextState;
    default:
      return state;
  }
}

export default uiReducer;