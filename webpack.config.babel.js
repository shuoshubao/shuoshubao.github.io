import path from 'path'
import rimraf from 'rimraf'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

rimraf.sync('build')

const [isDev, isProd] = [process.env.NODE_ENV === 'development', process.env.NODE_ENV === 'production']
const plugins = [
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: 'template/index.html'
  }),
  new webpack.optimize.DedupePlugin()
]

isProd && plugins.push(new webpack.optimize.UglifyJsPlugin())


module.exports = {
  entry: {
    app: './asset/app'
  },
  output: {
    path: './build',
    filename: '[name]_[chunkhash].js'
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
        exclude: path.resolve(__dirname, 'node_modules'),
        query: {
          "presets": ["es2015", "stage-2", "react"]
        }
      }
    ]
  },
  plugins
}
