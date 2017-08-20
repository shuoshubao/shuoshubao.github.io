import path from 'path'
import glob from 'glob'
import {
  isDev,
  PATH_ROOT,
  PATH_SRC,
  PATH_BUILD,
  PATH_PUBLIC,
  FILENAME
} from './config'

const entry = glob.sync(path.resolve(PATH_SRC, 'view/**/index.js'))
.map(v => path.relative(path.resolve(PATH_SRC, 'view'), v))
.map(v => v.split('/').slice(0, -1).join('/'))
.reduce((prev, cur) => {
  prev[cur] = `./src/view/${cur}`
  return prev
}, {})

export default {
  entry,
  output: {
    path: PATH_BUILD,
    publicPath: PATH_PUBLIC,
    filename: FILENAME
  }
}
