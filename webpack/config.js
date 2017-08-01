import path from 'path'

export const isDev = process.env.NODE_ENV === 'development'
export const PATH_ROOT = path.resolve(__dirname, '..')
export const PATH_BUILD = path.resolve(PATH_ROOT, 'build')
export const PATH_SRC = path.resolve(PATH_ROOT, 'src')

export default {
  isDev,
  PATH_ROOT,
  PATH_BUILD,
  PATH_SRC
}
