import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import {exec} from 'child_process'

exec('rm build/*')
const [isDev, isProd] = [process.env.NODE_ENV === 'development', process.env.NODE_ENV === 'production']
const plugins = [
  new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    filename: '../index.html',
    template: 'template/index.html'
  }),
  new HtmlWebpackHarddiskPlugin()
]


isProd && plugins.push(new webpack.optimize.UglifyJsPlugin())

const webpackConfig = {
  entry: {
    app: './asset/app'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]_[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        use: [
          {
            loader: 'json-loader'
          }
        ]
      },
      {
        test: /\.png|gif|jpg/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          "presets": ["es2015", "stage-2", "react"]
        }
      }
    ]
  },
  plugins,
  devtool: "source-map",
  devServer: {
    inline: true,
    port: 8080,
    publicPath: '/build/',
    filename: '[name]_[hash].js'
  }
}
const t1 = Date.now()
webpack(webpackConfig).run(() => {console.log(`编译时间: ${Date.now() - t1}ms`)})
