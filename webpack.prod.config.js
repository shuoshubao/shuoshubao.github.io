var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  entry: {
    app: './src/jsx/app.jsx',
  },
  output: {
    path: './build',
    filename: '[name].bundle.js'
  },
  plugins: [
    commonsPlugin,
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
      {test: /\.html$/, loader: 'html'},
      {test: /\.md$/, loader: 'html!markdown'},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.jsx?$/, include: /prosemirror/, loader: 'babel'},
      {test: /\.(png|jpg|gif)$/, loader: 'url?limit=10000' },
    ]
  },
  resolve: {
    react: '/node_modules/react/react.js',
    'react-prosemirror': __dirname
  }
};