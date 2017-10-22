import {isDev, port, FILENAME, pathConfig, stats} from './config'

export default isDev ? {
  externals: {},
  devServer: {
    port,
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
