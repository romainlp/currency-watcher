import { ADD_RATE, SET_RATES } from '../constants/action-types';

const initialState = {
  rates: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RATE:
      return {...state, rates: [...state.rates, action.payload]};
    case SET_RATES:
      return {...state, rates: action.payload};
    default:
      return state;
  }
};

export default rootReducer;