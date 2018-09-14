const config = require('../config.js');
const Rate = require('../models/Rate');
const moment = require('moment');

/**
 * Get rates for a currency
 */
const get = async ctx => {
  if (ctx.params.limit === undefined) {
    ctx.params.limit = config.DEFAULT_NUMBER_RESULTS;
  }

  const rates = await Rate.find(
    {
      currencyFrom: ctx.params.from,
      currencyTo: ctx.params.to
    },
    null,
    {
      sort: { 'date': -1 },
      limit: parseInt(ctx.params.limit)
    }
  );

  if (!rates) {
    throw new Error('Threre was an error retrieving rates.');
  } else {
    const res = [];

    rates.forEach(rate => {
      res.push({ date: rate.date, rate: rate.rate });
    });

    let values = rates.map(x => x.rate);
    let min = values.reduce((min, p) => p < min ? p : min, values[0]);
    let max = values.reduce((max, p) => p > max ? p : max, values[0]);
    ctx.body = {
      min: min,
      max: max,
      rates: res
    };
  }
};

const day = async ctx => {
  const startDate = moment.utc().format('YYYY-MM-DD');
  const rates = await Rate.find(
    {
      currencyFrom: ctx.params.from,
      currencyTo: ctx.params.to,
      date: {
        $gte: startDate
      }
    },
    null,
    {
      sort: { 'date': -1 }
    }
  );

  if (!rates) {
    throw new Error('Threre was an error retrieving rates.');
  } else {
    const res = [];
    const wrappedByHours = {};
    rates.forEach(rate => {
      let key = moment.utc(rate.date).format('H');
      if (wrappedByHours[key] === undefined) {
        wrappedByHours[key] = { key: key, date: rate.date, rate: rate.rate }
      }
    });
  
    let values = rates.map(x => x.rate);
    let min = values.reduce((min, p) => p < min ? p : min, values[0]);
    let max = values.reduce((max, p) => p > max ? p : max, values[0]);
    ctx.body = {
      min: min,
      max: max,
      rates: Object.values(wrappedByHours).reverse()
    };
  }
}

const week = async ctx => {
  const startDate = moment.utc().startOf('week').format('YYYY-MM-DD');
  const rates = await Rate.find(
    {
      currencyFrom: ctx.params.from,
      currencyTo: ctx.params.to,
      date: {
        $gte: startDate,
        $lt: moment.utc().format('YYYY-MM-DD'),
      }
    },
    null,
    {
      sort: { 'date': -1 }
    }
  );

  if (!rates) {
    throw new Error('Threre was an error retrieving rates.');
  } else {
    const res = [];

    rates.forEach(rate => {
      res.push({ date: rate.date, rate: rate.rate });
    });
  
    let values = rates.map(x => x.rate);
    let min = values.reduce((min, p) => p < min ? p : min, values[0]);
    let max = values.reduce((max, p) => p > max ? p : max, values[0]);
    ctx.body = {
      min: min,
      max: max,
      rates: res
    };
  }
}

const month = async ctx => {
  const startDate = moment.utc().startOf('month').format('YYYY-MM-DD');
  const rates = await Rate.find(
    {
      currencyFrom: ctx.params.from,
      currencyTo: ctx.params.to,
      date: {
        $gte: startDate,
        $lt: moment.utc().format('YYYY-MM-DD'),
      }
    },
    null,
    {
      sort: { 'date': -1 }
    }
  );

  if (!rates) {
    throw new Error('Threre was an error retrieving rates.');
  } else {
    const res = [];

    rates.forEach(rate => {
      res.push({ date: rate.date, rate: rate.rate });
    });
  
    let values = await rates.map(x => x.rate);
    let min = await values.reduce((min, p) => p < min ? p : min, values[0]);
    let max = await values.reduce((max, p) => p > max ? p : max, values[0]);
    ctx.body = {
      min: min,
      max: max,
      rates: res
    };
  }
}

const year = async ctx => {
  const startDate = moment.utc().startOf('year').format('YYYY-MM-DD');
  const rates = await Rate.find(
    {
      currencyFrom: ctx.params.from,
      currencyTo: ctx.params.to,
      date: {
        $gte: startDate,
        $lt: moment.utc().format('YYYY-MM-DD'),
      }
    },
    null,
    {
      sort: { 'date': -1 }
    }
  );

  if (!rates) {
    throw new Error('Threre was an error retrieving rates.');
  } else {
    const res = [];

    rates.forEach(rate => {
      res.push({ date: rate.date, rate: rate.rate });
    });
  
    let values = rates.map(x => x.rate);
    let min = values.reduce((min, p) => p < min ? p : min, values[0]);
    let max = values.reduce((max, p) => p > max ? p : max, values[0]);
    ctx.body = {
      min: min,
      max: max,
      rates: res
    };
  }
}

module.exports.get = get;
module.exports.day = day;
module.exports.week = week;
module.exports.month = month;
module.exports.year = year;
