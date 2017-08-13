import path from 'path'
import glob from 'glob'
import {isDev, PATH_ROOT, PATH_SRC, PATH_BUILD, PATH_PUBLIC, FILENAME} from './config'

const entry = glob.sync(path.resolve(PATH_SRC, 'view/**/index.js'))
.map(v => path.relative(PATH_SRC, v))
.map(v => v.split('/')[1])
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
