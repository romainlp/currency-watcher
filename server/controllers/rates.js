const axios = require('axios');
const moment = require('moment');
const config = require('../config.js');
const Rate = require('../models/Rate');

/**
 * Get rates for a currency
 */
const get = async (ctx) => {

  if (ctx.params.limit === undefined) {
    ctx.params.limit = config.DEFAULT_NUMBER_RESULTS * config.CURRENCIES.length;
  } else {
    ctx.params.limit = ctx.params.limit * config.CURRENCIES.length;
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

  const res = {};
  const label = [];
  const group = config.CURRENCIES.filter((element) => { return element != ctx.params.from});
  group.forEach((currency) => {
    res[currency] = []
  })
  rates.forEach((rate) => {
    res[rate.currencyTo].push({ date: rate.date, rate: rate.rate })
  })

  if (!rates) {
    throw new Error('Threre was an error retrieving rates.')
  } else {
    let values = rates.map(x => x.rate)
    let min = values.reduce((min, p) => p < min ? p : min, values[0])
    let max = values.reduce((max, p) => p > max ? p : max, values[0])
    ctx.body = {
      min: min,
      max: max,
      rates: res
    }
  }
}

module.exports.get = get