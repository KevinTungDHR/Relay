import { 
  SHOW_MODAL, 
  HIDE_MODAL 
} from "../actions/ui_actions";
import merge from 'lodash/merge';


const initialState = {
  modal: null
}

const uiReducer = (state = initialState, action) => {
  Object.freeze(state);
  const nextState = merge({}, state);
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