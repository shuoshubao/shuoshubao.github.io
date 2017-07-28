import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import {exec} from 'child_process'

exec('rm src/lib/*')

const PATH_ROOT = path.resolve(__dirname, '..')
const PATH_SRC = path.resolve(PATH_ROOT, 'src')
const FILE_NAME = '[name]_[hash:5]'

export default {
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
    filename: `${FILE_NAME}.js`,
    library: FILE_NAME
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.resolve(PATH_SRC, 'lib/vendor.json'),
      name: FILE_NAME
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
