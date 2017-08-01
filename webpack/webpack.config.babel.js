import entry from './entry'
import plugins from './plugins'
import module from './module'
import resolve from './resolve'
import {isDev} from './config'

const webpackConfig = {
  ...entry,
  module,
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
