import { isDev, pathConfig, extractLESS } from './config'

export default [
  {
    test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: isDev ? '[name].[ext]' : '[name].[hash].[ext]'
    }
  },
  {
    test: /\.css$/,
    loader: 'happypack/loader?id=css'
  },
  {
    test: /\.module.less$/,
    use: extractLESS.extract({
      fallback: 'style-loader',
      use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[path]_[name]_[hash]',
            minimize: !isDev
          }
        },
        {
          loader: 'less-loader'
        }
      ]
    })
  },
  {
    test: /^((?!\.module).)*less$/,
    use: extractLESS.extract({
      fallback: 'style-loader',
      use: [{
          loader: 'css-loader',
          options: {
            minimize: !isDev
          }
        },
        {
          loader: 'less-loader'
        }
      ]
    })
  },
  {
    test: /\.js$/,
    loader: 'happypack/loader?id=js',
    include: pathConfig.src,
    exclude: /node_modules/
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    include: pathConfig.src,
    exclude: /node_modules/
  }
]
