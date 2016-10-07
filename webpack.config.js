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
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'}
    ]
  },
  resolve: {
    react: '/node_modules/react/react.js'
  }
};