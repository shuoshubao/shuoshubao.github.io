import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'
import WebpackDevServer from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import SpritesmithPlugin from 'webpack-spritesmith'
import PrepackWebpackPlugin from 'prepack-webpack-plugin'
import {exec} from 'child_process'

const [isDev, isProd] = [
  process.env.NODE_ENV === 'development',
  process.env.NODE_ENV === 'production'
]

const src = path.join(__dirname, 'src')

exec('rm build/*')

const alias = fs.readdirSync(src).reduce((prev, cur) => {
  prev[cur] = path.join(src, cur)
  return prev
}, {})

const extractLESS = new ExtractTextPlugin(isDev ? '[name].css' : '[name]_[chunkhash:5].css')

const HtmlWebpackPluginMinify = isProd ? {
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
} : {}

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
    _: 'lodash',
    React: 'react',
    ReactDOM: 'react-dom',
    PureRenderMixin: 'react-addons-pure-render-mixin',
    PropTypes: 'prop-types',
    classnames: 'classnames',
    moment: 'moment'
  }),
  extractLESS,
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new CopyWebpackPlugin([{
    from: path.resolve(__dirname, 'src/lib'),
    to: path.resolve(__dirname, 'build')
  }]),
  new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    filename: path.join(__dirname, 'index.html'),
    template: path.join(src, 'template/index.ejs'),
    title: 'WEB前端开发',
    chunks: ['manifest', 'vendor', 'app'],
    minify: HtmlWebpackPluginMinify,
    ENV: isDev ? 'dev' : 'prod'
  }),
  new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    filename: path.join(__dirname, 'mobx.html'),
    template: path.join(src, 'template/index.ejs'),
    title: 'WEB前端开发 - Mobx',
    chunks: ['manifest', 'vendor', 'mobx'],
    minify: HtmlWebpackPluginMinify,
    ENV: isDev ? 'dev' : 'prod'
  }),
  new HtmlWebpackHarddiskPlugin(),
  /*new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => module.context && module.context.includes('node_modules')
  }),*/
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('./src/lib/manifest.json')
  }),
  new SpritesmithPlugin({
    src: {
      cwd: path.join(src, 'spriteImgSrc'),
      glob: '*.png'
    },
    target: {
      image: path.join(src, 'style/sprite.png'),
      css: path.join(src, 'style/sprite.less')
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
    /*new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/lib'),
      to: path.resolve(__dirname, 'build')
    }]),*/
    new PrepackWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ])
}

const webpackConfig = {
  entry: {
    // vendor: ['react', 'react-dom', 'prop-types', 'classnames'],
    app: './src/asset/app',
    mobx: './src/asset/mobx'
  },
  output: {
    path: path.join(__dirname, 'build'),
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
        loader: 'url-loader',
        query: {
          limit: 1024,
          name: isDev ? '[name].[ext]' : '[name]_[chunkhash:5].[ext]'
        }
      },
      {
        test: /\.t[e]?xt$/,
        loader: 'raw-loader'
      },
      {
        test: /\.vtpl$/,
        loader: 'raw-loader'
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
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.lesss$/,
        use: extractLESS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]_[name]_[hash:5]',
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
        test: /\.module.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[path]_[name]_[hash:5]',
              minimize: isProd
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /^((?!\.module).)*less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'autoprefixer-loader', 'stylus-loader']
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src')
        ],
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
    alias
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
    filename: '[name].js',
    historyApiFallback: false,
    proxy: {

    }
  }
}

module.exports = webpackConfig
