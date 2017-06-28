import path from 'path'
import webpack from 'webpack'
import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'
import WebpackDevServer from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import SpritesmithPlugin from 'webpack-spritesmith'
import PrepackWebpackPlugin from 'prepack-webpack-plugin'
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
    ENV: JSON.stringify(isDev ? 'dev' : 'prod')
  }),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    React: 'react',
    ReactDom: 'react-dom',
    PropTypes: 'prop-types',
    classnames: 'classnames',
    moment: 'moment'
  }),
  extractLESS,
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    filename: '../index.html',
    template: 'template/index.ejs',
    title: 'WEB前端开发🐿',
    chunks: ['manifest', 'vendor', 'app'],
    minify: isProd ? {
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
    } : {},
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
      image: path.resolve(__dirname, 'style/sprite.png'),
      css: path.resolve(__dirname, 'style/sprite.less')
    },
    apiOptions: {
      cssImageRef: 'sprite.png'
    }
  })
]

if(isDev) {
  const dashboard = new Dashboard()
  plugins.push(...[
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(dashboard.setData)
  ])
}
if(isProd) {
  plugins.push(...[
    new PrepackWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ])
}

const webpackConfig = {
  entry: {
    vendor: ['react', 'react-dom', 'prop-types', 'classnames'],
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
      {
        test: /\.(eot|woff|woff2|svg|ttf|gif)([\?]?.*)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.module.less$/,
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
        test: /^((?!\.module).)*less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
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
            'transform-decorators-legacy',
            ['import', {
              libraryName: 'antd',
              style: true
            }]
          ],
          presets: ['es2015', 'stage-2', 'react']
        }
      }
    ]
  },
  plugins,
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['browser', 'main'],
    alias: {
      style: path.join(__dirname, 'style'),
      component: path.join(__dirname, 'component')
    }
  },
  externals: {

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
