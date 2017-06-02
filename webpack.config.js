const path = require('path')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')
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
    alwaysWriteToDisk: true,
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
  new HtmlWebpackHarddiskPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => module.context && module.context.includes('node_modules')
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  new SpritesmithPlugin({
    src: {
      cwd: path.resolve(__dirname, 'spriteImgSrc'),
      glob: '*.png'
    },
    target: {
      image: path.resolve(__dirname, 'spriteImgTarget/sprite.png'),
      css: path.resolve(__dirname, 'spriteImgTarget/sprite.less')
    },
    apiOptions: {
      cssImageRef: 'sprite.png'
    }
  })
  // new DashboardPlugin()
]


isProd && plugins.push(new webpack.optimize.UglifyJsPlugin())

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    app: './asset/app'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: isProd ? 'https://shuoshubao.github.io/build/' : '/build/',
    filename: isDev ? '[name].js' : '[name]_[hash:5].js'
  },
  module: {
    rules: [
      {
        test: /\.png|gif|jpg/,
        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 1024,
              name: isDev ? '[name].[ext]' : '[name]_[hash:5].[ext]'
            }
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
              localIdentName: '[local]_[hash:5]'
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
    modules: ['node_modules', 'spriteImgTarget'],
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
    publicPath: '/build/',
    filename: '[name]_[hash].js',
    historyApiFallback: true,
    proxy: {

    }
  }
}
