import rimraf from 'rimraf'
import entry from './entry'
import plugins from './plugins'
import module from './module'
import resolve from './resolve'

rimraf.sync('build/*')

const isDev = process.env.NODE_ENV === 'development'

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
