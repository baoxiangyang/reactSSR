const fs = require('fs');
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
const config = require('./config/index.js');
const hot_plugin = require('./hot_plugin.js');
let reactSSR = require('./dist/server/bundle.js').default;
const index = require('./routes/index')
const api = require('./routes/api')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

//加载客户端热更新模块

if (!config.isPro) {
  hot_plugin()(app)
}
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
app.use(logger())

// routes
app.use(index.routes(), index.allowedMethods());
app.use(api.routes(), api.allowedMethods());
app.use(async (ctx, next) => {
	const ssrData = await reactSSR(ctx, next);
	await ctx.render('app', {
    title: 'Hello SSR!',
    isPro: config.isPro,
    ...ssrData
  })
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

/* 开发环境 ssr 热更新 */
if (!config.isPro) {
  fs.watch('./src', {recursive: true}, (eventType, filename) => {
    Object.keys(require.cache).forEach(item => {
      if(item.indexOf('\\dist\\server') != -1) {
       delete require.cache[require.resolve(item)];
      }
    });
    setTimeout(() => {
      reactSSR = require('./dist/server/bundle.js').default;
    },1000)
  });
}

module.exports = app
