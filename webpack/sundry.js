import {isDev, port, FILENAME, PATH_PUBLIC} from './config'

export default isDev ? {
  externals: {},
  devServer: {
    port,
    // quiet: true,
    filename: FILENAME,
    publicPath: PATH_PUBLIC,
    stats: {children: false},
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
  stats: {children: false}
}
