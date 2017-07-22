import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import {exec} from 'child_process'

exec('rm src/lib/*')

const PATH_ROOT = path.resolve(__dirname, '..')
const PATH_SRC = path.resolve(PATH_ROOT, 'src')

module.exports = {
  entry: {
    vendor: [
      './node_modules/react/react.js',
      './node_modules/classnames/index.js',
      './node_modules/prop-types/index.js',
      './node_modules/react-dom/index.js'
    ]
  },
  output: {
    path: path.resolve(PATH_SRC, 'lib'),
    filename: '[name]_[hash:5].js',
    library: '[name]_[hash:5]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.resolve(PATH_SRC, 'lib/manifest.json'),
      name: '[name]_[hash:5]'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
