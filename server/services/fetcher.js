const axios = require('axios');
const moment = require('moment');
const config = require('../config');
const Rate = require('../models/Rate');

/**
 * Fetch datas from Transferwise API
 * - We save the request every minutes
 */
const fetch = async function(from, to) {
  if (config.CURRENCIES.indexOf(from) === -1 ||
    config.CURRENCIES.indexOf(to) === -1) {
    await Promise.reject(new Error('Invalid currency'));
  }

  if (to == from) {
    await Promise.reject(new Error('Currency have to be different'));
  }

  const lastRate = await Rate.findOne(
    {
      currencyFrom: from,
      currencyTo: to
    },
    {},
    {
      sort: { 'date': -1 }
    });

  if (lastRate) {
    const dateRequest = moment(lastRate.date);
    if (moment().isSame(dateRequest, 'minutes')) {
      return lastRate;
    }
  }

  let args = {
    'amount': config.CURRENCY_AMOUNT,
    'amountCurrency': 'source',
    'hasDiscount': false,
    'isFixedRate': false,
    'isGuaranteedFixedTarget': false,
    'sourceCurrency': from,
    'targetCurrency': to
  };

  try {
    const response = await axios.get(
      config.TRANSFERWISE_URL,
      {
        params: args,
        crossdomain: true,
        headers: {
          'X-Authorization-key': config.TRANSFERWISE_KEY
        }
      }
    );

    await Rate.create({
      currencyFrom: from,
      currencyTo: to,
      rate: response.data.transferwiseRate
    });
  } catch (error) {
    await Promise.reject(new Error(error));
  }
};

/**
 * Fetch all currency for a given one
 */
const fetchAll = function(from) {
  config.CURRENCIES.forEach(async to => {
    if (from != to) {
      fetch(from, to).catch(error => { console.log(error); });
    }
  });
};

module.exports.fetch = fetch;
module.exports.fetchAll = fetchAll;
