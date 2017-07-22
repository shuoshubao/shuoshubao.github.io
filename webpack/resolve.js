import fs from 'fs'
import path from 'path'

const PATH_ROOT = path.resolve(__dirname, '..')
const PATH_SRC = path.resolve(PATH_ROOT, 'src')

const alias = fs.readdirSync(PATH_SRC).reduce((prev, cur) => {
  prev[cur] = path.resolve(PATH_SRC, cur)
  return prev
}, {})

const resolve = {
  modules: ['node_modules'],
  extensions: ['.js', '.jsx', '.json'],
  mainFields: ['browser', 'main'],
  alias
}

export default resolve
