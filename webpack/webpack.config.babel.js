import entry from './entry'
import plugins from './plugins'
import module from './module'
import resolve from './resolve'
import {isDev, PATH_PUBLIC, FILENAME, port} from './config'

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
    publicPath: PATH_PUBLIC,
    filename: FILENAME,
    port,
    historyApiFallback: false,
    quiet: true,
    proxy: {

    }
  }
}

export default webpackConfig
