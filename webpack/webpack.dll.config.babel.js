import fs from 'fs'
import {resolve} from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import AssetsWebpackPlugin from 'assets-webpack-plugin'
import WebpackParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'
import {
  pathConfig,
  dllEntry as entry,
  uglifyJSConfig
} from './config'

const LIBRARY_NAME = '__[name]_[chunkhash:5]'

export default {
  entry,
  output: {
    path: pathConfig.dll,
    filename: '[name].[chunkhash:5].js',
    library: LIBRARY_NAME
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CleanWebpackPlugin([pathConfig.dll], {
      root: pathConfig.root,
      verbose: false
    }),
    new AssetsWebpackPlugin({
      path: pathConfig.dll,
      filename: 'index.json',
      prettyPrint: true
    }),
    new webpack.DllPlugin({
      path: resolve(pathConfig.dll, '[name].json'),
      name: LIBRARY_NAME
    }),
    new WebpackParallelUglifyPlugin(uglifyJSConfig)
  ],
  stats: {
    colors: true,
    modules: false,
    children: false,
    hash: false,
    version: false
  }
}
