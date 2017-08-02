import {isDev, PATH_ROOT, PATH_BUILD, publicPath} from './config'

export default {
  entry: {
    app: './src/asset/app',
    mobx: './src/asset/mobx'
  },
  output: {
    path: PATH_BUILD,
    publicPath,
    filename: isDev ? '[name].js' : '[name].[chunkhash].js'
  }
}
