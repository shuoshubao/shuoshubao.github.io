import {isDev, port, FILENAME, pathConfig} from './config'

const stats = {
  colors: true,
  modules: false,
  children: false,
  hash: false,
  version: false
}

export default isDev ? {
  externals: {},
  devServer: {
    port,
    quiet: true,
    hot: true,
    filename: FILENAME,
    publicPath: pathConfig.public,
    stats,
    historyApiFallback: false,
    proxy: {}
  },
  performance: {
    hints: false,
    maxEntrypointSize: 1e2,
    maxAssetSize: 1e6,
    assetFilter: assetFileName => !(/\.map$/.test(assetFileName))
  }
} : {
  stats
}
