import path from 'path'
import glob from 'glob'
import {pathConfig} from './config'

export default glob.sync(`${pathConfig.view}/**/index.js`)
.reduce((prev, cur) => {
  prev[path.relative(pathConfig.view, cur).split('/').slice(0, -1)] = cur
  return prev
}, {})
