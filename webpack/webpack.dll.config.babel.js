import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import {PATH_ROOT, PATH_SRC} from './common'

const FILE_NAME = '[name].[hash]'
const PATH_LIB = path.resolve(PATH_SRC, 'lib')

export default {
  entry: {
    vendor: [
      'react',
      'classnames',
      'prop-types',
      'react-dom'
    ]
  },
  output: {
    path: PATH_LIB,
    filename: `${FILE_NAME}.js`,
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin([PATH_LIB], {
      root: PATH_ROOT,
      verbose: false
    }),
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]',
      path: path.resolve(PATH_LIB, 'vendor.json')
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
