import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import webpack from 'webpack'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import devConfig from './webpack.config.babel'

import { port } from './config'
import chalk from 'chalk'

var app = new koa()
app.use(bodyParser())

devConfig.entry = Object.entries(devConfig.entry).reduce((prev, [k, v]) => {
    prev[k] = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', v]
    return prev
}, {})

const compile = webpack(devConfig)

app.use(devMiddleware(compile, {
    lazy: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    publicPath: devConfig.output.publicPath,
    headers: { 'X-Custom-Header': 'yes' },
    stats: devConfig.devServer.stats
}))

app.use(hotMiddleware(compile, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}))

app.listen(devConfig.devServer.port)
