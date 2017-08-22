import koa from 'koa'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import koaWebpackHotMiddleware from 'koa-webpack-hot-middleware'
import webpackConfig from './webpack.config.babel'

const app = new koa()

webpackConfig.entry = {
    index: ['./src/view/demo.js']
}

const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler), {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
})

app.use(koaWebpackHotMiddleware(compiler))

// app.listen(webpackConfig.devServer.port);
