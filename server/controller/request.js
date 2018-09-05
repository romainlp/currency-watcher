const axios = require('axios');
const moment = require('moment');
const config = require('../config.js');
const Request = require('../model/Request');

/**
 * Fetch datas from Transferwise API
 * - We save the request every minutes
 */
exports.fetch = async (ctx) => {
  if (config.CURRENCIES.indexOf(ctx.params.from) === -1
    || config.CURRENCIES.indexOf(ctx.params.to) === -1) {
    throw new Error('Invalid currency', 400)
  }
  if (ctx.params.to == ctx.params.from) {
    throw new Error('Currency have to be different', 400)
  }
  const lastRequest = await Request.findOne(
    {
      currencyFrom: ctx.params.from,
      currencyTo: ctx.params.to
    }, 
    {}, 
    {
      sort: { 'date' : -1 }
    })
  if (lastRequest) {
    const dateRequest = moment(lastRequest.date)
    if (moment().isSame(dateRequest, 'minute')) {
      ctx.body = lastRequest
    } else {
      let args = {
        'amount': config.CURRENCY_AMOUNT,
        'amountCurrency': 'source',
        'hasDiscount': false,
        'isFixedRate': false,
        'isGuaranteedFixedTarget': false,
        'sourceCurrency': ctx.params.from,
        'targetCurrency': ctx.params.to
      }
      try {
        const response = await axios.get(
          config.TRANSFERWISE_URL, 
          {
            params: args,
            crossdomain: true,
            headers: {
              'X-Authorization-key': config.TRANSFERWISE_KEY
            }
          })
        const request = await Request.create({
          currencyFrom: config.CURRENCY_FROM,
          currencyTo: config.CURRENCY_TO,
          datas: response.data
        })
        ctx.body = request
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}

/**
 * Get list of all request
 */
exports.getRequests = async (ctx) => {
  const requests = await Request.find({})
  if (!requests) {
    throw new Error('Threre was an error retrieving requests.')
  } else {
    ctx.body = requests
  }
}