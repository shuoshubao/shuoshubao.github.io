import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import AssetsWebpackPlugin from 'assets-webpack-plugin'
import WebpackParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'
import {PATH_ASSET, PATH_ROOT, PATH_LIB, LIB_NAME, PATH_PUBLIC, uglifyJSConfig} from './config'

const LIBRARY_NAME = '__[name]_[hash]'

export default {
  entry: {
    [LIB_NAME]: [
      'react',
      'classnames',
      'prop-types',
      'react-dom'
    ]
  },
  output: {
    path: PATH_LIB,
    filename: '[name].[hash].js',
    library: LIBRARY_NAME
  },
  plugins: [
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
  ]
}
