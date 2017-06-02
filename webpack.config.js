const path = require('path')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {exec} = require('child_process')

exec('rm build/*')

const [isDev, isProd] = [process.env.NODE_ENV === 'development', process.env.NODE_ENV === 'production']
const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
    },
    ENV: JSON.stringify(isDev ? 'dev' : 'prod')
  }),
  new webpack.ProvidePlugin({

  }),
  new HtmlWebpackPlugin({
    alwaysWriteToDisk: false,
    filename: '../index.html',
    template: 'template/index.html',
    title: 'WEB前端开发🐿',
    favicon: 'favicon.ico',
    chunks: ['manifest', 'vendor', 'app'],
    hash: false,
    minify: {
      removeComments: isProd,
      collapseWhitespace: isProd
    },
    ENV: isDev ? 'dev' : 'prod'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => module.context && module.context.includes('node_modules')
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  // new DashboardPlugin()
]


isProd && plugins.push(new webpack.optimize.UglifyJsPlugin())

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    app: './asset/app'
  },
  output: {
    hashDigestLength: 5,
    path: path.resolve(__dirname, 'build'),
    publicPath: isProd ? 'https://shuoshubao.github.io/build' : 'http://localhost:9090/build',
    filename: isDev ? '[name].js' : '[name]_[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.png|gif|jpg/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          "presets": ["es2015", "stage-2", "react"]
        }
      }
    ]
  },
  plugins,
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['browser', 'main'],
    alias: {}
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    hot: true,
    port: 9090,
    // contentBase: '', ?
    publicPath: '/build',
    filename: '[name]_[hash].js',
    historyApiFallback: true,
    proxy: {

    }
  }
}
