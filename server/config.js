require('dotenv').load();

// Transferwise
exports.TRANSFERWISE_URL = process.env.TRANSFERWISE_URL ? process.env.TRANSFERWISE_URL : 'https://transferwise.com/api/v1/payment/calculate';
exports.TRANSFERWISE_KEY = process.env.TRANSFERWISE_KEY ? process.env.TRANSFERWISE_KEY : 'dad99d7d8e52c2c8aaf9fda788d8acdc';
exports.CURRENCY_FROM = process.env.CURRENCY_FROM ? process.env.CURRENCY_FROM : 'AUD';
exports.CURRENCY_AMOUNT = process.env.CURRENCY_AMOUNT ? process.env.CURRENCY_AMOUNT : '1000';

// Mongoose
exports.MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost/currencyWatcher';

// Currencies
exports.CURRENCIES = ['EUR', 'GBP', 'USD', 'AUD'];

// Misc
exports.DEFAULT_NUMBER_RESULTS = process.env.DEFAULT_NUMBER_RESULTS ? process.env.DEFAULT_NUMBER_RESULTS : 15;
exports.FETCH_INTERVAL = process.env.FETCH_INTERVAL ? process.env.FETCH_INTERVAL : (1000 * 60) * 5; // 5 minutes
exports.CORS_ORIGIN = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN : 'http://178.128.67.138:9883'