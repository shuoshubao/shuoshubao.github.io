import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import {exec} from 'child_process'

exec('rm src/lib/*')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'prop-types', 'classnames']
  },
  output: {
    path: path.join(__dirname, 'src/lib'),
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, 'src/lib', 'manifest.json'),
      name: '[name]'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
