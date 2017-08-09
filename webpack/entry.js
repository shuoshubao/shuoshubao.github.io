import {isDev, PATH_ROOT, PATH_BUILD, PATH_PUBLIC, FILENAME} from './config'

export default {
  entry: {
    home: './src/view/home',
    mobx: './src/view/mobx'
  },
  output: {
    path: PATH_BUILD,
    publicPath: PATH_PUBLIC,
    filename: FILENAME
  }
}
