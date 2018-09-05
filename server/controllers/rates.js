const axios = require('axios');
const moment = require('moment');
const config = require('../config.js');
const Rate = require('../models/Rate');

/**
 * Get rates for a currency
 */
const get = async (ctx) => {

  if (ctx.params.limit === undefined) {
    ctx.params.limit = config.DEFAULT_NUMBER_RESULTS
  }

  const rates = await Rate.find({
      currencyFrom: ctx.params.from
    },
    null,
    {
      sort: { 'date' : -1 },
      limit: parseInt(ctx.params.limit)
    }
  );

  if (!rates) {
    throw new Error('Threre was an error retrieving rates.')
  } else {
    let values = rates.map(x => x.rate)
    let min = values.reduce((min, p) => p < min ? p : min, values[0])
    let max = values.reduce((max, p) => p > max ? p : max, values[0])
    ctx.body = {
      min: min,
      max: max,
      rates: rates
    }
  }
}

module.exports.get = get