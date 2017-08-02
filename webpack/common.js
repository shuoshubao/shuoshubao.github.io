import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export const isDev = process.env.NODE_ENV === 'development'
export const LIB_NAME = 'vendor'
export const PATH_ROOT = path.resolve(__dirname, '..')
export const PATH_BUILD = path.resolve(PATH_ROOT, 'build')
export const PATH_SRC = path.resolve(PATH_ROOT, 'src')
export const PATH_LIB = path.resolve(PATH_SRC, 'lib')
export const extractLESS = new ExtractTextPlugin(isDev ? '[name].css' : '[name].[chunkhash].css')
