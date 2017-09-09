import os from 'os'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export const port = 8080
export const isDev = process.env.NODE_ENV === 'development'
export const FILENAME = `[name]${isDev ? '' : '.[chunkhash:5]'}.js`


const ROOT = process.cwd()
export const pathConfig = {
  root: process.cwd(),
  public: '/build/',
  src: path.resolve(ROOT, 'src'),
  asset: path.resolve(ROOT, '.temp/asset'),
  build: path.resolve(ROOT, 'build'),
  view: path.resolve(ROOT, 'src/view'),
  lib: path.resolve(ROOT, '.temp/dll')
}

export const LIB_NAME = 'vendor'

export const extractLESS = new ExtractTextPlugin(`[name]${isDev ? '' : '.[chunkhash:5]'}.css`)
export const uglifyJSConfig = isDev ? {} : {
  workerCount: os.cpus().length,
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
