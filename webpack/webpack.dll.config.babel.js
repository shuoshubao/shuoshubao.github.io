import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import AssetsWebpackPlugin from 'assets-webpack-plugin'
import WebpackParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'
import {
  pathConfig,
  LIB_NAME,
  uglifyJSConfig
} from './config'

const LIBRARY_NAME = '__[name]_[chunkhash:5]'

export default {
  entry: {
    [LIB_NAME]: [
      'react',
      'react-dom',
      'prop-types',
      'classnames'
    ]
  },
  output: {
    path: pathConfig.lib,
    filename: '[name].[chunkhash:5].js',
    library: LIBRARY_NAME
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CleanWebpackPlugin([pathConfig.lib], {
      root: pathConfig.root,
      verbose: false
    }),
    new AssetsWebpackPlugin({
      path: pathConfig.asset,
      filename: `${LIB_NAME}.json`,
      processOutput: rs => JSON.stringify(rs, null, 4)
    }),
    new webpack.DllPlugin({
      path: path.resolve(pathConfig.lib, `${LIB_NAME}.json`),
      name: LIBRARY_NAME
    }),
    new WebpackParallelUglifyPlugin(uglifyJSConfig)
  ],
  stats: {
    modules: false,
    children: false,
    hash: false,
    version: false
  }
}
