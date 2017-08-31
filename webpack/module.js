import {isDev, PATH_SRC, extractLESS} from './config'

export default {
  rules: [
    {
      test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: isDev ? '[name].[ext]' : '[name].[hash:20].[ext]'
      }
    },
    {
      test: /\.t[e]?xt$/,
      loader: 'raw-loader'
    },
    {
      test: /\.ejs/,
      loader: 'ejs-loader'
    },
    {
      test: /\.css$/,
      loader: 'happypack/loader?id=css'
    },
    {
      test: /\.lesss$/,
      use: extractLESS.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[name]_[hash:5]',
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
      test: /\.module.less$/,
      use: [
        {
          loader: 'style-loader'
        },
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
    },
    {
      test: /^((?!\.module).)*less$/,
      loader: ['style-loader', 'css-loader', 'less-loader']
    },
    {
      test: /\.styl$/,
      loader: ['style-loader', 'css-loader', 'autoprefixer-loader', 'stylus-loader']
    },
    {
      test: /\.js$/,
      loader: 'happypack/loader?id=js',
      include: PATH_SRC,
      exclude: /node_modules/
    }
  ]
}
