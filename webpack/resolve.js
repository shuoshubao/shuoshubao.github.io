import fs from 'fs'
import path from 'path'
import {pathConfig} from './config'

const alias = fs.readdirSync(pathConfig.src).reduce((prev, cur) => {
  prev[cur] = path.resolve(pathConfig.src, cur)
  return prev
}, {})

const resolve = {
  modules: ['node_modules', path.resolve(pathConfig.root, 'node_modules')],
  extensions: ['.js', '.jsx', '.json', '.vue'],
  mainFields: ['browser', 'main'],
  alias
}

export default resolve
