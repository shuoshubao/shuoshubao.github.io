import path from 'path'
import os from 'os'
import webpack from 'webpack'
import HappyPack from 'happypack'
import PrepackWebpackPlugin from 'prepack-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import AssetsWebpackPlugin from 'assets-webpack-plugin'
import WebpackParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'
import WebpackSpritesmith from 'webpack-spritesmith'
import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'
import {isDev, PATH_ROOT, PATH_SRC, PATH_ASSET, PATH_LIB, PATH_BUILD, PATH_PUBLIC, LIB_NAME, extractLESS} from './config'

const assetLib = require(path.resolve(PATH_ASSET, LIB_NAME))

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
    chunks: ['home']
  },
  {
    filename: 'mobx',
    title: 'WEB前端开发 - Mobx',
    chunks: ['mobx']
  }
].map(v => {
  const asset = require(PATH_ASSET)
  const chunkList = [LIB_NAME, 'manifest', ...v.chunks]
  const chunkListCss = chunkList.map(v => asset[v].css)
  const chunkListJs = chunkList.map(v => asset[v].js)
  return new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    filename: path.resolve(PATH_ROOT, `${v.filename}.html`),
    template: path.resolve(PATH_SRC, `template/index.ejs`),
    title: v.title,
    chunks: [],
    chunkListCss,
    chunkListJs,
    minify: HtmlWebpackPluginMinify,
    ENV: isDev ? 'dev' : 'prod'
  })
})

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
    from: PATH_LIB,
    to: PATH_BUILD,
    ignore: '*.json'
  }]),
  new AssetsWebpackPlugin({
    path: PATH_ASSET,
    filename: 'index.json',
    processOutput: rs => JSON.stringify(Object.assign(rs, assetLib), null, 4)
  }),
  ...HtmlWebpackPluginConfig,
  new HtmlWebpackHarddiskPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),
  new webpack.DllReferencePlugin({
    manifest: require(`${PATH_LIB}/${LIB_NAME}.json`)
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
  new WebpackSpritesmith({
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
    new CleanWebpackPlugin([PATH_BUILD], {
      root: PATH_ROOT,
      verbose: false
    }),
    new webpack.HashedModuleIdsPlugin(),
    new PrepackWebpackPlugin(),
    new WebpackParallelUglifyPlugin({workerCount: os.cpus().length})
  ])
}

export default plugins
