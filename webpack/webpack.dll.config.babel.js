import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import AssetsWebpackPlugin from 'assets-webpack-plugin'
import {PATH_ROOT, PATH_SRC, PATH_LIB, LIB_NAME} from './config'

const LIBRARY = '[name]_[hash]'

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
    library: LIBRARY
  },
  plugins: [
    new CleanWebpackPlugin([PATH_LIB], {
      root: PATH_ROOT,
      verbose: false
    }),
    new AssetsWebpackPlugin({
      path: PATH_LIB,
      filename: 'asset.json',
      processOutput: rs => JSON.stringify({ id: rs[LIB_NAME].js }, null, 4)
    }),
    new webpack.DllPlugin({
      context: __dirname,
      name: LIBRARY,
      path: path.resolve(PATH_LIB, `${LIB_NAME}.json`)
    }),
    new webpack.optimize.UglifyJsPlugin({comments: false})
  ]
}
