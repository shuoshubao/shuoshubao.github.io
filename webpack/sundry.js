import {isDev, port, FILENAME, PATH_PUBLIC} from './config'

const stats = {
  modules: false,
  children: false,
  hash: false,
  version: false
}

export default isDev ? {
  externals: {},
  devServer: {
    port,
    filename: FILENAME,
    publicPath: PATH_PUBLIC,
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
