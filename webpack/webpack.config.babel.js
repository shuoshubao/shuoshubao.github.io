import {exec} from 'child_process'
import entry from './entry'
import output from './output'
import plugins from './plugins'
import loader from './loader'
import resolve from './resolve'

exec('rm build/*')

const isDev = process.env.NODE_ENV === 'development'

const webpackConfig = {
  entry,
  output,
  module: loader,
  plugins,
  resolve,
  externals: {}
}

if(isDev) {
  webpackConfig.devtool = 'source-map'
  webpackConfig.devServer = {
    inline: true,
    hot: true,
    port: 8080,
    publicPath: '/build/',
    filename: '[name].js',
    historyApiFallback: false,
    proxy: {

    }
  }
}

export default webpackConfig
