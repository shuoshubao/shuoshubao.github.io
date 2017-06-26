import path from 'path'
import webpack from 'webpack'
import DashboardPlugin from 'webpack-dashboard/plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import SpritesmithPlugin from 'webpack-spritesmith'
import {exec} from 'child_process'

const [isDev, isProd] = [
  process.env.NODE_ENV === 'development',
  process.env.NODE_ENV === 'production'
]

exec('rm build/*')

const extractLESS = new ExtractTextPlugin(isDev ? '[name].css' : '[name]_[chunkhash:5].css')

const plugins = [
  new webpack.BannerPlugin([
    '硕鼠宝',
    'https://shuoshubao.github.io/'
  ].join('\n')),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
    },
    ENV: JSON.stringify(isDev ? 'dev' : 'prod')
  }),
  new webpack.ProvidePlugin({

  }),
  extractLESS,
  new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    filename: '../index.html',
    template: 'template/index.ejs',
    title: 'WEB前端开发🐿',
    chunks: ['manifest', 'vendor', 'app'],
    minify: {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      removeScriptTypeAttributes: true,
      removeStyleTypeAttributes: true,
      sortAttributes: true,
      sortClassName: true,
      keepClosingSlash: false
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

if(isDev) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}
if(isProd) {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

const webpackConfig = {
  entry: {
    vendor: ['react', 'react-dom', 'prop-types'],
    app: './asset/app'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    // publicPath: isProd ? 'https://orn2bxyo7.bkt.clouddn.com/' : '/build/',
    // publicPath: isProd ? 'https://shuoshubao.github.io/build/' : '/build/',
    publicPath: '/build/',
    jsonpFunction: 'webpackJsonp',
    filename: isDev ? '[name].js' : '[name]_[chunkhash:5].js'
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
              name: isDev ? '[name].[ext]' : '[name]_[chunkhash:5].[ext]'
            }
          }
        ]
      },
      {
        test: /\.t[e]?xt$/,
        use: ['raw-loader']
      },
      {
        test: /\.vtpl$/,
        use: ['raw-loader']
      },
      {
        test: /\.ejs/,
        loader: 'ejs-loader'
      },
      {
        test: /\.tpl/,
        loader: 'ejs-loader'
      },
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?hash=sha512&digest=hex&name=font/[name].[hash:8].[ext]'},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?hash=sha512&digest=hex&name=font/[name].[hash:8].[ext]'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?hash=sha512&digest=hex&name=font/[name].[hash:8].[ext]'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?hash=sha512&digest=hex&name=font/[name].[hash:8].[ext]'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?hash=sha512&digest=hex&name=font/[name].[hash:8].[ext]'},
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: extractLESS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]_[hash:5]',
                minimize: isProd
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'autoprefixer-loader', 'stylus-loader']
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            'transform-object-assign',
            'transform-decorators-legacy'
          ],
          presets: ['es2015', 'stage-2', 'react']
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
  }
}

if(isDev) {
  webpackConfig.devtool = 'source-map'
  webpackConfig.devServer = {
    inline: true,
    hot: true,
    port: 9090,
    publicPath: '/build/',
    filename: '[name]_[hash].js',
    historyApiFallback: true,
    proxy: {

    }
  }
}

module.exports = webpackConfig
