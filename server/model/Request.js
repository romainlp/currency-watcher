const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema = {
  date: { type: Date, default: Date.now },
  currencyFrom: String,
  currencyTo: String,
  datas: mongoose.Schema.Types.Mixed
};

module.exports = mongoose.model('Request', RequestSchema);