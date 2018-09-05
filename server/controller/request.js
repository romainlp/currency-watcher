const axios = require('axios');
const moment = require('moment');
const config = require('../config.js');
const Request = require('../model/Request');

/**
 * Fetch datas from Transferwise API
 * - We save the request every minutes
 */
exports.fetch = async (ctx) => {
  const lastRequest = await Request.findOne(
    {}, 
    {}, 
    {
      sort: { 'date' : -1 }
    })
  if (lastRequest) {
    const dateRequest = moment(lastRequest.date)
    if (moment().isSame(dateRequest, 'minute')) {
      ctx.body = lastRequest
    } else {
      console.log('Fetch new request ', moment().format())
      let args = {
        'amount': config.CURRENCY_AMOUNT,
        'amountCurrency': 'source',
        'hasDiscount': false,
        'isFixedRate': false,
        'isGuaranteedFixedTarget': false,
        'sourceCurrency': config.CURRENCY_FROM,
        'targetCurrency': config.CURRENCY_TO
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
        const request = Request.create({
          currencyFrom: config.CURRENCY_FROM,
          currencyTo: config.CURRENCY_TO,
          datas: response.data
        })
        ctx.body = response.data
      } catch (error) {
        console.log(error)
        ctx.body = error
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