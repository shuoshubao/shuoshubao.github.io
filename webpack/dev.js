const {
  webpack,
  commonsPlugin,
  webpackCommonConfig,
} = require('./common.js');

module.exports = Object.assign(webpackCommonConfig, {
  plugins: [commonsPlugin],
})
