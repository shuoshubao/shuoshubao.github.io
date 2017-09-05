import path from 'path'
import glob from 'glob'
import {PATH_VIEW} from './config'

export default glob.sync(`${PATH_VIEW}/**/index.js`)
.reduce((prev, cur) => {
  prev[path.relative(PATH_VIEW, cur).split('/').slice(0, -1)] = cur
  return prev
}, {})
