const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const json = require('koa-json');
const cors = require('@koa/cors');
const config = require('./config');
const ratesController = require('./controllers/rates');
const statsController = require('./controllers/stats');
const fetcher = require('./services/fetcher');

const app = new Koa();
const router = new Router();

app.use(cors({
  origin: config.CORS_ORIGIN
}));
app.use(json());
app.use(require('./middlewares/logger.js').logger);
app.use(require('./middlewares/responseTime.js').responseTime);

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true });
mongoose.connection.on('error', console.error);

router.get('/', async(ctx, next) => { 
  ctx.body = {
    message: 'Currency Watcher API'
  };
});

router.get('/rates/day/:from/:to', ratesController.day);
router.get('/rates/week/:from/:to', ratesController.week);
router.get('/rates/month/:from/:to', ratesController.month);
router.get('/rates/year/:from/:to', ratesController.year);
router.get('/rates/:from/:to/:limit*', ratesController.get);

router.get('/stats/day/:from/:to', statsController.day);
router.get('/stats/week/:from/:to', statsController.week);
router.get('/stats/month/:from/:to', statsController.month);
router.get('/stats/year/:from/:to', statsController.year);

if (process.env.NODE_ENV !== 'test') {
  config.CURRENCIES.forEach(currency => {
    fetcher.fetchAll(currency);
    setInterval(() => { fetcher.fetchAll(currency); }, config.FETCH_INTERVAL);
  });
}

app.use(require('./middlewares/errorHandler.js').errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(process.env.PORT || 3000);
module.exports = server;
