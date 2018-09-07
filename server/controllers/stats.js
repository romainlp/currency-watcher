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

const render = async(ctx, rates) => {
  if (rates && rates.length > 0) {
    const firstRate = rates[rates.length - 1];
    const lastRate = rates[0];
    ctx.body = {
      firstRate: firstRate,
      lastRate: lastRate,
      diff: lastRate.rate - firstRate.rate
    };
  } else {
    ctx.body = {
      message: 'No stats.'
    };
  }
};

const day = async ctx => {
  const startDate = moment.utc().hours(0).minutes(0).seconds(0).milliseconds(0).format('YYYY-MM-DD');
  const rates = await getRates(ctx, startDate);

  render(ctx, rates);
};

const week = async ctx => {
  const startDate = moment.utc().startOf('week').format('YYYY-MM-DD');
  const rates = await getRates(ctx, startDate);

  render(ctx, rates);
};

const month = async ctx => {
  const startDate = moment.utc().startOf('month').format('YYYY-MM-DD');
  const rates = await getRates(ctx, startDate);

  render(ctx, rates);
};

const year = async ctx => {
  const startDate = moment.utc().startOf('year').format('YYYY-MM-DD');
  const rates = await getRates(ctx, startDate);

  render(ctx, rates);
};

module.exports.day = day;
module.exports.week = week;
module.exports.month = month;
module.exports.year = year;
