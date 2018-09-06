import axios from 'axios';
import { API } from '../config';

export default {
  /**
   * Rates endpoints
   */
  rates() {
    return {
      get: (from, to, limit) => axios.get(`${API}rates/${from}/${to}/${limit}`),
    };
  },
  /**
   * Statistics endpoints
   */
  stats() {
    return {
      day: (from, to) => axios.get(`${API}stats/day/${from}/${to}`),
      week: (from, to) => axios.get(`${API}stats/week/${from}/${to}`),
      month: (from, to) => axios.get(`${API}stats/month/${from}/${to}`),
      year: (from, to) => axios.get(`${API}stats/year/${from}/${to}`),
    };
  },
};
