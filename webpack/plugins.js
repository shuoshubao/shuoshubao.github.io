import fs from 'fs'
import {resolve} from 'path'
import os from 'os'
import webpack from 'webpack'
import entry from './entry'
import HappyPack from 'happypack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin'
import AssetsWebpackPlugin from 'assets-webpack-plugin'
import WebpackParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'
import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'
import {
  isDev,
  pathConfig,
  dllEntry,
  extractLESS,
  templateContent,
  webpackProvideConfig,
  uglifyJSConfig,
  minifyHtmlConfig as minify
} from './config'

const HtmlWebpackPluginConfig = Object.entries(entry).map(([k, v]) => new HtmlWebpackPlugin({
  filename: resolve(pathConfig.build, `${k}.html`),
  templateContent,
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
  new webpack.ProgressPlugin(),
  new webpack.BannerPlugin([
    '硕鼠宝',
    'https://shuoshubao.github.io/'
  ].join('\n')),
  new webpack.DefinePlugin({
    ENV: JSON.stringify(isDev ? 'dev' : 'prod')
  }),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.ProvidePlugin(webpackProvideConfig),
  extractLESS,
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new CopyWebpackPlugin([{
    from: pathConfig.dll,
    to: pathConfig.build,
    ignore: '*.json'
  }]),
  new HtmlWebpackIncludeAssetsPlugin({
    append: false,
    assets: Object.entries(require(`${pathConfig.dll}/index.json`)).map(([k, v]) => Object.values(v)).reduce((prev, cur) => {
        prev.push(...cur)
        return prev
    }, [])
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: 2
  }),
  ...Object.keys(dllEntry).map(v => new webpack.DllReferencePlugin({
    manifest: require(`${pathConfig.dll}/${v}.json`)
  })),
  createHappyPlugin('css', ['style-loader', 'css-loader']),
  createHappyPlugin('js', [
    {
      path: 'babel-loader',
      query: {
        plugins: [
          'transform-decorators-legacy',
          ['import', {
            libraryName: 'antd',
            style: true
          }]
        ],
        presets: ['env', 'stage-1', 'react']
      }
    }
  ])
]

if(!process.argv[1].includes('webpack/dev')) {
    plugins.push(...HtmlWebpackPluginConfig)
}

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
    new AssetsWebpackPlugin({
      path: pathConfig.asset,
      filename: 'entry.json',
      prettyPrint: true
    }),
    new WebpackParallelUglifyPlugin(uglifyJSConfig)
  ])
}

export default plugins
