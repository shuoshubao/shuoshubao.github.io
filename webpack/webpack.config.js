const {
  webpack,
  commonsPlugin,
  webpackCommonConfig,
} = require('./webpack.common.config.js');

module.exports = Object.assign(webpackCommonConfig, {
  plugins: [commonsPlugin],
});
