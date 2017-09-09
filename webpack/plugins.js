import path from 'path'
import os from 'os'
import webpack from 'webpack'
import entry from './entry'
import HappyPack from 'happypack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin'
import AssetsWebpackPlugin from 'assets-webpack-plugin'
import WebpackParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'
import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'
import {
  isDev,
  pathConfig,
  LIB_NAME,
  extractLESS,
  uglifyJSConfig,
  minifyHtmlConfig as minify
} from './config'

const assetLib = require(path.resolve(pathConfig.asset, LIB_NAME))

const HtmlWebpackPluginConfig = Object.entries(entry).map(([k, v]) => new HtmlWebpackPlugin({
  alwaysWriteToDisk: true,
  filename: path.resolve(pathConfig.build, `${k}.html`),
  template: path.resolve(pathConfig.src, `template/index.ejs`),
  title: 'WEB前端开发',
  favicon: 'favicon.ico',
  chunks: ['manifest', k],
  minify,
  ENV: isDev ? 'dev' : 'prod'
}))


const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

const createHappyPlugin = (id, loaders) => new HappyPack({
  id: id,
  loaders,
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
    moment: 'moment',
    React: 'react',
    ReactDOM: 'react-dom',
    PureRenderMixin: 'react-addons-pure-render-mixin',
    PropTypes: 'prop-types',
    classnames: 'classnames',
    Vue: 'vue'
  }),
  extractLESS,
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new CopyWebpackPlugin([{
    from: pathConfig.lib,
    to: pathConfig.build,
    ignore: '*.json'
  }]),
  new AssetsWebpackPlugin({
    path: pathConfig.asset,
    filename: 'index.json',
    processOutput: rs => JSON.stringify(rs, null, 4)
  }),
  new HtmlWebpackIncludeAssetsPlugin({
    append: false,
    assets: Object.entries(assetLib).map(([k, v]) => Object.values(v)).reduce((prev, cur) => {
        prev.push(...cur)
        return prev
    }, [])
  }),
  ...HtmlWebpackPluginConfig,
  new HtmlWebpackHarddiskPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),
  new webpack.DllReferencePlugin({
    manifest: require(`${pathConfig.lib}/${LIB_NAME}`)
  }),
  createHappyPlugin('css', ['style-loader', 'css-loader']),
  createHappyPlugin('js', [
    {
      path: 'babel-loader',
      query: {
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
      }
    }
  ])
]

if(isDev) {
  plugins.push(...[
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ])
  if(!process.argv[1].includes('webpack/dev')) {
      const dashboard = new Dashboard()
      plugins.push(new DashboardPlugin(dashboard.setData))
  }
}else {
  plugins.push(...[
    new CleanWebpackPlugin([pathConfig.build], {
      root: pathConfig.root,
      verbose: false
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackParallelUglifyPlugin(uglifyJSConfig)
  ])
}

export default plugins
