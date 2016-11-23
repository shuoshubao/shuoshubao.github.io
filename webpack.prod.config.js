const webpack = require('webpack')
const webpackCommonConfig = require('./webpack.common.config.js')

module.exports = Object.assign(webpackCommonConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
})