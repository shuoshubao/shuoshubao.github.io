import {isDev, PATH_ROOT, PATH_BUILD, PATH_PUBLIC, FILENAME} from './config'

export default {
  entry: {
    app: './src/asset/app',
    mobx: './src/asset/mobx'
  },
  output: {
    path: PATH_BUILD,
    publicPath: PATH_PUBLIC,
    filename: FILENAME
  }
}
