import axios from 'axios'
import { API } from '../config'

export default {
  /**
   * Rates endpoints
   */
  rates () {
    return {
      get: (from, to, limit) => axios.get( API + 'rates/' + from + '/' + to + '/' + limit ),
    }
  }
}