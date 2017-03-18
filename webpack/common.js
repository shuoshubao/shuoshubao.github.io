const webpack = require('webpack')

module.exports.webpack = webpack
module.exports.webpackCommonConfig = {
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
          "presets": ["es2015", "stage-2", "react"]
        },
        exclude: /node_modules/
      }
    ]
  }
}
