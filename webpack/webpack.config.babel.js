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
    port,
    quiet: true,
    filename: FILENAME,
    publicPath: PATH_PUBLIC,
    stats: {},
    historyApiFallback: false,
    proxy: {}
  },
  webpackConfig.performance = {
    hints: false,
    maxEntrypointSize: 1e2,
    maxAssetSize: 1e6,
    assetFilter: assetFilename => !(/\.map$/.test(assetFilename))
  }
}

export default webpackConfig
