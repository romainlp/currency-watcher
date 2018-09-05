import { ADD_REQUEST, SET_REQUESTS } from '../constants/action-types';

export const addRequest = request => ({ type: ADD_REQUEST, payload: request });
export const setRequests = requests => ({ type: SET_REQUESTS, payload: requests });