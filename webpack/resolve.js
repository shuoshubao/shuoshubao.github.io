import fs from 'fs'
import path from 'path'
import {PATH_ROOT, PATH_SRC} from './config'

const alias = fs.readdirSync(PATH_SRC).reduce((prev, cur) => {
  prev[cur] = path.resolve(PATH_SRC, cur)
  return prev
}, {})

const resolve = {
  modules: [path.resolve(PATH_ROOT, 'node_modules')],
  extensions: ['.js', '.jsx', '.json', '.vue'],
  mainFields: ['browser', 'main'],
  alias
}

export default resolve
