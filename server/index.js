const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const json = require('koa-json');
const cors = require('@koa/cors');
const config = require('./config');
const ratesController = require('./controllers/rates');
const fetcher = require('./services/fetcher');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(json());
app.use(require('./middlewares/logger.js').logger);
app.use(require('./middlewares/responseTime.js').responseTime);

mongoose.connect(config.MONGOOSE_URL, { useNewUrlParser: true });
mongoose.connection.on('error', console.error);

router.get('/', async (ctx, next) => { ctx.body = 'Currency Watcher API' });
router.get('/rates/:from/:limit*', ratesController.get);

fetcher.fetchAll('AUD');
setInterval(() => { fetcher.fetchAll('AUD') }, config.FETCH_INTERVAL);

app.use(require('./middlewares/errorHandler.js').errorHandler);
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);