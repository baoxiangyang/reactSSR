/* 客户端热更换 */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack');
const MFS = require('memory-fs');
const clientConfig = require('./build/client.config.js');


module.exports = function (){
  // const mfs = new MFS();
  clientConfig.entry = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=1000&overlay=false', clientConfig.entry]  //todo
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  const clientCompiler = webpack(clientConfig);
  /*clientCompiler.outputFileSystem = mfs;
  clientCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return
  })*/

  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  });
  const hotMiddleware = require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 });

  return function (app) {
    app.use(async function(ctx, next){
      await new Promise((resolve, reject) => {
        devMiddleware(ctx.req, {
            end: (content) => {
              ctx.body = content;
              resolve();
            },
            setHeader: (name, value) => {
              ctx.set(name, value);
            },
        }, reject);
      }).catch(await next);
    });
    app.use(async function(ctx, next){
      await new Promise((resolve, reject) => {
        hotMiddleware(ctx.req, ctx.res, resolve);
      }).then(await next);
    });
  }
}
