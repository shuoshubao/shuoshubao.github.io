import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import webpack from 'webpack'
import webpackConfig from './webpack.config.babel'
import webpackMiddleware from './util/webpackMiddleware'

var app = new koa()

app.use(bodyParser())

webpackMiddleware(app)


app.listen(webpackConfig.devServer.port)
