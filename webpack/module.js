import ExtractTextPlugin from 'extract-text-webpack-plugin'

const isDev = process.env.NODE_ENV === 'development'
const extractLESS = new ExtractTextPlugin(isDev ? '[name].css' : '[name]_[chunkhash:5].css')

export default {
  rules: [
    {
      test: /\.png|gif|jpg/,
      loader: 'url-loader',
      query: {
        limit: 1024,
        name: isDev ? '[name].[ext]' : '[name]_[chunkhash:5].[ext]'
      }
    },
    {
      test: /\.t[e]?xt$/,
      loader: 'raw-loader'
    },
    {
      test: /\.vtpl$/,
      loader: 'raw-loader'
    },
    {
      test: /\.ejs/,
      loader: 'ejs-loader'
    },
    {
      test: /\.tpl/,
      loader: 'ejs-loader'
    },
    {
      test: /\.(eot|woff|woff2|svg|ttf|gif)([\?]?.*)$/,
      loader: 'file-loader'
    },
    {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
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
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        plugins: [
          'transform-object-assign',
          'transform-object-rest-spread',
          'transform-decorators-legacy',
          ['import', {
            libraryName: 'antd',
            style: true
          }]
        ],
        presets: ['es2015', 'stage-2', 'react']
      }
    }
  ]
}
