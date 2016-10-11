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
  plugins: [],
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style!css?module!less'},
      {test: /\.js$/, loader: 'babel'}
    ]
  }
};