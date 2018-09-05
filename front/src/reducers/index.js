import { ADD_REQUEST, SET_REQUESTS } from '../constants/action-types';

const initialState = {
  requests: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REQUEST:
      return {...state, requests: [...state.requests, action.payload]};
    case SET_REQUESTS:
      return {...state, requests: action.payload};
    default:
      return state;
  }
};

export default rootReducer;