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
import glob from 'glob'
import {exec} from 'child_process'

exec('rm build/*')

const isDev = process.env.NODE_ENV === 'development'
const PATH_ROOT = path.resolve(__dirname, '..')
const PATH_SRC = path.resolve(PATH_ROOT, 'src')
const PATH_BUILD = path.resolve(PATH_ROOT, 'build')
const vendorHash = glob.sync(path.resolve(PATH_SRC, 'lib/vendor_*.js'))[0].slice(-8, -3)
const alias = fs.readdirSync(PATH_SRC).reduce((prev, cur) => {
  prev[cur] = path.resolve(PATH_SRC, cur)
  return prev
}, {})
const extractLESS = new ExtractTextPlugin(isDev ? '[name].css' : '[name]_[chunkhash:5].css')
const HtmlWebpackPluginMinify = isDev ? {} : {
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
}

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
    from: `${PATH_SRC}/lib`,
    to: PATH_BUILD
  }]),
  new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    filename: path.resolve(PATH_ROOT, 'index.html'),
    template: path.resolve(PATH_SRC, 'template/index.ejs'),
    title: 'WEB前端开发',
    chunks: ['manifest', 'app'],
    minify: HtmlWebpackPluginMinify,
    ENV: isDev ? 'dev' : 'prod',
    vendorHash
  }),
  new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    filename: path.resolve(PATH_ROOT, 'mobx.html'),
    template: path.resolve(PATH_SRC, 'template/index.ejs'),
    title: 'WEB前端开发 - Mobx',
    chunks: ['manifest', 'mobx'],
    minify: HtmlWebpackPluginMinify,
    ENV: isDev ? 'dev' : 'prod',
    vendorHash
  }),
  new HtmlWebpackHarddiskPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(`${PATH_SRC}/lib/manifest.json`)
  }),
  new SpritesmithPlugin({
    src: {
      cwd: path.resolve(PATH_SRC, 'spriteImgSrc'),
      glob: '*.png'
    },
    target: {
      image: path.resolve(PATH_SRC, 'style/sprite.png'),
      css: path.resolve(PATH_SRC, 'style/sprite.less')
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
}else {
  plugins.push(...[
    new PrepackWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ])
}

const webpackConfig = {
  entry: {
    app: './src/asset/app',
    mobx: './src/asset/mobx'
  },
  output: {
    path: PATH_BUILD,
    publicPath: isDev ? '/build/' : 'https://orn2bxyo7.bkt.clouddn.com/',
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
                minimize: !isDev
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
              minimize: !isDev
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
    port: 8080,
    publicPath: '/build/',
    filename: '[name].js',
    historyApiFallback: false,
    proxy: {

    }
  }
}

module.exports = webpackConfig
