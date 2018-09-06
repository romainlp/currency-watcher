import {
  SET_RATES,
  SET_CURRENCY_FROM,
  SET_CURRENCY_TO,
} from '../constants/action-types';
import { CURRENCIES } from '../../config';

const initialState = {
  rates: [],
  currencyFrom: CURRENCIES[0],
  currencyTo: CURRENCIES[1],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RATES:
      return { ...state, rates: action.payload };
    case SET_CURRENCY_FROM:
      return { ...state, currencyFrom: action.payload };
    case SET_CURRENCY_TO:
      return { ...state, currencyTo: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
