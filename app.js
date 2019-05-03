const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const static = require('koa-static')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const nunjucks = require('nunjucks');
const favicon = require('koa-favicon');
const reactSSR = require('./dist/server/bundle.js').default;
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(favicon(__dirname + '/public/images/logo.ico'));
app.use(static(__dirname + '/public'));
app.use(static(__dirname + '/dist/client'));

/*ssr 需要渲染标签，关闭转义，顺便去掉空格*/
nunjucks.configure(__dirname + '/views', { 
  autoescape: false,
  trimBlocks:true,
  lstripBlocks: true
});
/* 设置引擎模板为nunjucks */
app.use(views(__dirname + '/views', {
  extension: 'html',
  map: {html: 'nunjucks'}
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods());

app.use(async (ctx, next) => {
	const ssrData = await reactSSR(ctx, next);
	await ctx.render('app', {
    title: 'Hello Koa 2!',
    ...ssrData
  })
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
