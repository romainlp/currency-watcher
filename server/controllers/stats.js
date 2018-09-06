const moment = require('moment');
const Rate = require('../models/Rate');

const getRates = async(ctx, startDate) => {
  return Rate.find(
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
};

const day = async ctx => {
  const startDate = moment().hours(0).minutes(0).seconds(0).milliseconds(0).format('YYYY-MM-DD');
  const rates = await getRates(ctx, startDate);

  if (rates) {
    const firstRate = rates[rates.length - 1];
    const lastRate = rates[0];

    ctx.body = {
      firstRate: firstRate,
      lastRate: lastRate,
      diff: lastRate.rate - firstRate.rate
    };
  }
};

const week = async ctx => {
  const startDate = moment().startOf('week').format('YYYY-MM-DD');
  const rates = await getRates(ctx, startDate);

  if (rates) {
    const firstRate = rates[rates.length - 1];
    const lastRate = rates[0];

    ctx.body = {
      firstRate: firstRate,
      lastRate: lastRate,
      diff: lastRate.rate - firstRate.rate
    };
  }
};

const month = async ctx => {
  const startDate = moment().startOf('month').format('YYYY-MM-DD');
  const rates = await getRates(ctx, startDate);

  if (rates) {
    const firstRate = rates[rates.length - 1];
    const lastRate = rates[0];

    ctx.body = {
      firstRate: firstRate,
      lastRate: lastRate,
      diff: lastRate.rate - firstRate.rate
    };
  }
};

const year = async ctx => {
  const startDate = moment().startOf('year').format('YYYY-MM-DD');
  const rates = await getRates(ctx, startDate);

  if (rates) {
    const firstRate = rates[rates.length - 1];
    const lastRate = rates[0];

    ctx.body = {
      firstRate: firstRate,
      lastRate: lastRate,
      diff: lastRate.rate - firstRate.rate
    };
  }
};

module.exports.day = day;
module.exports.week = week;
module.exports.month = month;
module.exports.year = year;
