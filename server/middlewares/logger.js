module.exports.logger = async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  const st = ctx.response.status;
  console.log(`${ctx.method} - ${st} - ${ctx.url} - ${rt}`);
}