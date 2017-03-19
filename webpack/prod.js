const {
  webpack,
  webpackCommonConfig
} = require('./common')

module.exports = Object.assign(webpackCommonConfig, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
})
