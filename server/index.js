const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const json = require('koa-json');
const config = require('./config.js');
const requestController = require('./controller/request');
const app = new Koa();
const router = new Router();

// Pretty JSON
app.use(json());

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// Mongoose connection
mongoose.connect(config.MONGOOSE_URL, { useNewUrlParser: true });
mongoose.connection.on('error', console.error);

router.get('/', async (ctx, next) => {
  ctx.body = 'Currency Watcher Fetcher'
})

router.get('/fetch', requestController.fetch)
router.get('/requests', requestController.getRequests)

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);