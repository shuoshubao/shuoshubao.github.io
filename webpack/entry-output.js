import path from 'path'
import glob from 'glob'
import {
  isDev,
  PATH_ROOT,
  PATH_SRC,
  PATH_VIEW,
  PATH_BUILD,
  PATH_PUBLIC,
  FILENAME
} from './config'

const entry = glob.sync(`${PATH_VIEW}/**/index.js`)
.reduce((prev, cur) => {
  prev[path.relative(PATH_VIEW, cur).split('/').slice(0, -1)] = cur
  return prev
}, {})

const output = {
  path: PATH_BUILD,
  publicPath: PATH_PUBLIC,
  filename: FILENAME
}

export {entry, output}
