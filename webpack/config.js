import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export const port = 8080
export const isDev = process.env.NODE_ENV === 'development'
export const FILENAME = `[name]${isDev ? '' : '.[chunkhash]'}.js`

export const PATH_ROOT = path.resolve(__dirname, '..')
export const PATH_SRC = path.resolve(PATH_ROOT, 'src')
export const PATH_ASSET = path.resolve(PATH_ROOT, 'asset')
export const PATH_BUILD = path.resolve(PATH_ROOT, 'build')
export const PATH_PUBLIC = '/build/'
// export const PATH_PUBLIC = isDev ? '/build/' : 'http://orn2bxyo7.bkt.clouddn.com/'
export const PATH_LIB = path.resolve(PATH_ROOT, 'src/lib')
export const LIB_NAME = 'vendor'

export const extractLESS = new ExtractTextPlugin(`[name]${isDev ? '' : '.[chunkhash]'}.css`)
export const uglifyJSConfig = isDev ? {} : {
  compress: {
    warnings: false,
    collapse_vars: true,
    reduce_vars: true
  }
}

export const assetLib = require(path.resolve(PATH_ASSET, LIB_NAME))
