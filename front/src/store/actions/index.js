import {
  SET_RATES,
  SET_CURRENCY_FROM,
  SET_CURRENCY_TO,
} from '../constants/action-types';

export const setRates = rates => ({ type: SET_RATES, payload: rates });
export const setCurrencyFrom = currency => ({ type: SET_CURRENCY_FROM, payload: currency });
export const setCurrencyTo = currency => ({ type: SET_CURRENCY_TO, payload: currency });
