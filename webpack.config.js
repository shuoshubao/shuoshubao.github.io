const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = [
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: 'template/index.html',
    hash: true,
    cache: true
  }),
  new webpack.optimize.DedupePlugin()
]

process.env.NODE_ENV === 'production' && plugins.push(new webpack.optimize.UglifyJsPlugin())

module.exports = {
  entry: {
    app: './asset/app'
  },
  output: {
    path: './build',
    filename: '[name].js'
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
        loader: 'babel',
        query: {
          'presets': ['es2015', 'stage-2', 'react']
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins
}
