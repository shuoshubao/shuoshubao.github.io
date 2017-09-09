import glob from 'glob'
import {
  pathConfig,
  FILENAME
} from './config'

export default {
  path: pathConfig.build,
  publicPath: pathConfig.public,
  filename: FILENAME
}
