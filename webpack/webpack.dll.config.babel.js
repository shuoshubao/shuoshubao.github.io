import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import AssetsWebpackPlugin from 'assets-webpack-plugin'
import WebpackParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'
import {
  PATH_ASSET,
  PATH_ROOT,
  PATH_LIB,
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
    path: PATH_LIB,
    filename: '[name].[chunkhash:5].js',
    library: LIBRARY_NAME
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CleanWebpackPlugin([PATH_LIB], {
      root: PATH_ROOT,
      verbose: false
    }),
    new AssetsWebpackPlugin({
      path: PATH_ASSET,
      filename: `${LIB_NAME}.json`,
      processOutput: rs => JSON.stringify(rs, null, 4)
    }),
    new webpack.DllPlugin({
      path: path.resolve(PATH_LIB, `${LIB_NAME}.json`),
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
