import {isDev, PATH_ROOT, PATH_BUILD} from './common'

export default {
  entry: {
    app: './src/asset/app',
    mobx: './src/asset/mobx'
  },
  output: {
    path: PATH_BUILD,
    // publicPath: isDev ? '/build/' : 'https://orn2bxyo7.bkt.clouddn.com/',
    publicPath: '/build/',
    filename: isDev ? '[name].js' : '[name].[chunkhash].js'
  }
}
