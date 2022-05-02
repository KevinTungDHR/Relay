import { RECEIVE_STATUS } from "../actions/status_action";

const initialState = {
  isLoading: false
}

const statusReducer = (state = initialState, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_STATUS:
      nextState['isLoading'] = action.isLoading
      return nextState
    default: 
      return state;
  }
}

export default statusReducer;