import {relative} from 'path'
import glob from 'glob'
import {pathConfig} from './config'

export default glob.sync(`${pathConfig.view}/**/index.js`)
.reduce((prev, cur) => {
  prev[relative(pathConfig.view, cur).split('/').slice(0, -1).join('/')] = cur
  return prev
}, {})
