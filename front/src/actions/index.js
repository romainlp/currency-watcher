import { ADD_RATE, SET_RATES } from '../constants/action-types';

export const addRate = rate => ({ type: ADD_RATE, payload: rate });
export const setRates = rates => ({ type: SET_RATES, payload: rates });