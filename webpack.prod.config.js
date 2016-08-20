var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: './app.jsx',
  },
  output: {
    path: './build',
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false,
      mangle: {
        except: ['$', 'exports', 'require']
      }
    })
  ],
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.jsx?$/, include: /prosemirror/, loader: 'babel'},
    ]
  },
  resolve: {
    react: '/node_modules/react/react.js',
    'react-prosemirror': __dirname
  }
};