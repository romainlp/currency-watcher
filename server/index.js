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
  const st = ctx.response.status;
  console.log(`${ctx.method} - ${st} - ${ctx.url} - ${rt}`);
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

router.get('/fetch/:from/:to', requestController.fetch)
router.get('/requests', requestController.getRequests)

// Error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);