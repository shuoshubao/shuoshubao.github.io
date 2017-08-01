import os from 'os'
import path from 'path'
import webpack from 'webpack'
import HappyPack from 'happypack'
import PrepackWebpackPlugin from 'prepack-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import SpritesmithPlugin from 'webpack-spritesmith'
import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'
import glob from 'glob'
import {isDev, PATH_ROOT, PATH_SRC, PATH_BUILD} from './config'

const vendorHash = glob.sync(path.resolve(PATH_SRC, 'lib/vendor_*.js'))[0].slice(-23, -3)

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

const HtmlWebpackPluginConfig = [
  {
    filename: 'index',
    title: 'WEB前端开发',
    chunks: ['app']
  },
  {
    filename: 'mobx',
    title: 'WEB前端开发 - Mobx',
    chunks: ['mobx']
  }
].map(v => new HtmlWebpackPlugin({
  alwaysWriteToDisk: true,
  filename: path.resolve(PATH_ROOT, `${v.filename}.html`),
  template: path.resolve(PATH_SRC, `template/index.ejs`),
  title: v.title,
  chunks: ['manifest', ...v.chunks],
  minify: HtmlWebpackPluginMinify,
  ENV: isDev ? 'dev' : 'prod',
  vendorHash
}))

const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

const createHappyPlugin = (id, loader, query = {}) => new HappyPack({
  id: id,
  loaders: [
    {
      loader: `${loader}-loader`,
      query
    }
  ],
  threadPool: happyThreadPool,
  verbose: false
})

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
    to: PATH_BUILD,
    ignore: '*.json'
  }]),
  ...HtmlWebpackPluginConfig,
  new HtmlWebpackHarddiskPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(`${PATH_SRC}/lib/vendor.json`)
  }),
  createHappyPlugin('js', 'babel', {
    plugins: [
      'transform-object-assign',
      'transform-object-rest-spread',
      'transform-decorators-legacy',
      ['import', {
        libraryName: 'antd',
        style: true
      }]
    ],
    presets: ['es2015', 'stage-2', 'react']
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(dashboard.setData)
  ])
}else {
  plugins.push(...[
    new CleanWebpackPlugin(['build'], {
      root: PATH_ROOT,
      verbose: false
    }),
    new webpack.HashedModuleIdsPlugin(),
    new PrepackWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ])
}

export default plugins
