const path = require('path')
const webpack = require('webpack')

module.exports.webpack = webpack
module.exports.webpackCommonConfig = {
  entry: {
    app: './asset/app'
  },
  output: {
    path: './asset',
    filename: '[name].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: 'html!markdown'
      },
      {
        test: /\.png|gif|jpg/,
        loader: 'url-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css?module&localIdentName=[local]_[hash:base64:10]!less'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, loader: 'babel'
      }
    ]
  }
}
