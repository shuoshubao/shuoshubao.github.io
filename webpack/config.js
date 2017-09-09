import {resolve} from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export const port = 8080
export const isDev = process.env.NODE_ENV === 'development'
export const FILENAME = `[name]${isDev ? '' : '.[chunkhash:5]'}.js`

const ROOT = process.cwd()

export const pathConfig = {
  root: process.cwd(),
  public: '/build/',
  src: resolve(ROOT, 'src'),
  build: resolve(ROOT, 'build'),
  view: resolve(ROOT, 'src/view'),
  dll: resolve(ROOT, '.temp/dll'),
  asset: resolve(ROOT, '.temp/asset')
}

export const dllEntry = {
  react: [
    'react',
    'react-dom',
    'prop-types'
  ],
  tools: ['classnames']
}

export const extractLESS = new ExtractTextPlugin(`[name]${isDev ? '' : '.[chunkhash:5]'}.css`)

export const webpackProvideConfig = {
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
}

export const uglifyJSConfig = isDev ? {} : {
  uglifyJS: {
    compress: {
      warnings: false,
      collapse_vars: true,
      reduce_vars: true
    }
  }
}

export const minifyHtmlConfig = isDev ? {} : {
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
