import {isDev, PATH_ROOT, PATH_BUILD, PATH_PUBLIC} from './config'

export default {
  entry: {
    app: './src/asset/app',
    mobx: './src/asset/mobx'
  },
  output: {
    path: PATH_BUILD,
    publicPath: PATH_PUBLIC,
    filename: isDev ? '[name].js' : '[name].[chunkhash].js'
  }
}
