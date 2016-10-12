var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: './app'
  },
  output: {
    path: './build',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css?modules&localIdentName=shuoshubao_[hash:base64:10]!less'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, loader: 'babel'
      }
    ]
  }
};