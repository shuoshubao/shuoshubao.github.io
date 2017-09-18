import {webpackCompiler} from './util'

export const webpackDllBuild = async () => {
    const webpackConfig = require('./webpack.dll.config.babel.js').default
    await webpackCompiler(webpackConfig)
}

export const webpackBuild = async () => {
    const webpackConfig = require('./webpack.config.babel.js').default
    await webpackCompiler(webpackConfig)
}
