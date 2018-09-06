const mongoose = require('mongoose');
const moment = require('moment');

const dateNow = function() {
  return moment({}).seconds(0).milliseconds(0);
};

const RateScheme = mongoose.Schema = {
  date: { type: Date, default: dateNow },
  currencyFrom: String,
  currencyTo: String,
  rate: Number
};

module.exports = mongoose.model('Rate', RateScheme);
