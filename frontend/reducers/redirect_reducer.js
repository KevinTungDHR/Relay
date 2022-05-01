import { 
  REDIRECT 
} from "../actions/redirect_action";

const redirectReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case REDIRECT:
      return action.link;
    default:
      return state;
  }
}

export default redirectReducer;