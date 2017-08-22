import koa from 'koa'
import bodyParser from 'koa-bodyparser'

import webpack from 'webpack'
import {devMiddleware, hotMiddleware} from 'koa-webpack-middleware'
import devConfig from './webpack.config.babel'

import {port} from './config'
import chalk from 'chalk'

var app = new koa();
app.use(bodyParser())

// console.log(devConfig)
devConfig.entry = {
    index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/view/demo.js']
}

const compile = webpack(devConfig)


app.use(devMiddleware(compile, {
    // display no info to console (only warnings and errors)
    noInfo: false,

    // display nothing to the console
    quiet: false,

    // switch into lazy mode
    // that means no watching, but recompilation on every request
    lazy: true,

    // watch options (only lazy: false)
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },

    // public path to bind the middleware to
    // use the same as in webpack
    publicPath: '/build/',

    // custom headers
    headers: { 'X-Custom-Header': 'yes' },

    // options for formating the statistics
    stats: {
        colors: true
    }
}))
app.use(hotMiddleware(compile, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}))

app.use(async (ctx, next)=> {
    ctx.body = 'hi'
    // await next();
});


app.listen(devConfig.devServer.port);
