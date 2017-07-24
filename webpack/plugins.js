import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import SpritesmithPlugin from 'webpack-spritesmith'
import PrepackWebpackPlugin from 'prepack-webpack-plugin'
import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'
import glob from 'glob'

const isDev = process.env.NODE_ENV === 'development'
const PATH_ROOT = path.resolve(__dirname, '..')
const PATH_SRC = path.resolve(PATH_ROOT, 'src')
const PATH_BUILD = path.resolve(PATH_ROOT, 'build')
const vendorHash = glob.sync(path.resolve(PATH_SRC, 'lib/vendor_*.js'))[0].slice(-8, -3)

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

export default plugins
