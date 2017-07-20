import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import {exec} from 'child_process'

exec('rm src/lib/*')

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
    path: path.join(__dirname, 'src/lib'),
    filename: '[name]_[hash:5].js',
    library: '[name]_[hash:5]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, 'src/lib', 'manifest.json'),
      name: '[name]_[hash:5]'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
