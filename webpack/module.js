import {isDev, pathConfig, extractLESS} from './config'

export default {
  rules: [
    {
      test: /\.t[e]?xt$/,
      loader: 'raw-loader'
    },
    {
      test: /\.ejs/,
      loader: 'ejs-loader'
    },
    {
      test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: isDev ? '[name].[ext]' : '[name].[hash:5].[ext]'
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
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[path]_[name]_[hash:5]',
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
        use: [
          {
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
}
