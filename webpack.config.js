const [webpack, webpackCommonConfig] = [require('webpack'), require('./webpack.common.config.js')]

module.exports = Object.assign(webpackCommonConfig);