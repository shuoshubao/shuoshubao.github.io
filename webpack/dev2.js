import koa from 'koa'
import bodyParser from 'koa-bodyparser'

import webpack from 'webpack'
import devConfig from './webpack.config.babel'
import chalk from 'chalk'
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('koa-webpack-hot-middleware');

var app = new koa();
app.use(bodyParser())



var compiler = webpack(devConfig);

app.use(webpackDevMiddleware(compiler, {
  // noInfo: true,
  publicPath: devConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(async (ctx, next)=> {
    ctx.body = 'hi'
    // await next();
});

app.listen(devConfig.devServer.port);
