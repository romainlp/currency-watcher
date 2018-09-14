const axios = require('axios');
const moment = require('moment');
const config = require('../config');
const Rate = require('../models/Rate');

const purge = async function(from, to) {
  const dayToPurge = 60;
  for (let i = 1; i < dayToPurge; i++) {
    let startDate = moment.utc().add(-i, 'days').format('YYYY-MM-DD');
    let endDate = moment.utc().add(-(i + 1), 'days').format('YYYY-MM-DD');
    const rates = await Rate.find(
      {
        currencyFrom: from,
        currencyTo: to,
        date: {
          $lt: startDate,
          $gte: endDate,
        }
      },
      null,
      {
        sort: { 'date': -1 }
      }
    );

    if (rates && rates.length > 1) {
      let i = 0;
      let total = 0;
      rates.forEach(rate => {
        if (i < rates.length - 1) {
          total += 1;
          rate.remove();
        }
        i++;
      });
      console.log('Delete', from, to, total);
    }
  }
}

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
      purge(from, to).catch(error => { console.log(error); });
    }
  });
};

module.exports.fetch = fetch;
module.exports.fetchAll = fetchAll;
