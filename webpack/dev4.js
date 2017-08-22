import koa from 'koa'
import webpack from 'webpack'
import webpackMiddleware from './webpackMiddleware'
import webpackConfig from './webpack.config.babel'

var app = new koa();

webpackMiddleware(app);


app.listen(webpackConfig.devServer.port);
