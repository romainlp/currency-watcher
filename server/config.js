require('dotenv').load()
// Transferwise
exports.TRANSFERWISE_URL = process.env.TRANSFERWISE_URL ? process.env.TRANSFERWISE_URL : 'https://transferwise.com/api/v1/payment/calculate'
exports.TRANSFERWISE_KEY =  process.env.TRANSFERWISE_KEY ? process.env.TRANSFERWISE_KEY : 'dad99d7d8e52c2c8aaf9fda788d8acdc'
exports.CURRENCY_FROM =  process.env.CURRENCY_FROM ? process.env.CURRENCY_FROM :  'AUD'
exports.CURRENCY_TO =  process.env.CURRENCY_TO ? process.env.CURRENCY_TO : 'EUR'
exports.CURRENCY_AMOUNT =  process.env.CURRENCY_AMOUNT ? process.env.CURRENCY_AMOUNT :  '1000'
// Mongoose
exports.MONGOOSE_URL =  process.env.MONGOOSE_URL ? process.env.MONGOOSE_URL :  'mongodb://localhost/currencyWatcher'