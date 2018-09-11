import axios from 'axios';
import { FRONT_API } from '../config';

export default {
  /**
   * Rates endpoints
   */
  rates() {
    return {
      get: (from, to, limit) => axios.get(`${FRONT_API}rates/${from}/${to}/${limit}`),
    };
  },
  /**
   * Statistics endpoints
   */
  stats() {
    return {
      day: (from, to) => axios.get(`${FRONT_API}stats/day/${from}/${to}`),
      week: (from, to) => axios.get(`${FRONT_API}stats/week/${from}/${to}`),
      month: (from, to) => axios.get(`${FRONT_API}stats/month/${from}/${to}`),
      year: (from, to) => axios.get(`${FRONT_API}stats/year/${from}/${to}`),
    };
  },
};
