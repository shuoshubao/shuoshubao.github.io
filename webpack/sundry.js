import fs from 'fs'
import { resolve, relative } from 'path'
import glob from 'glob'
import { isDev, port, FILENAME, pathConfig, stats } from './config'

export const entry = glob.sync(`${pathConfig.view}/**/index.js`)
.reduce((prev, cur) => {
    prev[relative(pathConfig.view, cur).split('/').slice(0, -1).join('/')] = cur
    return prev
}, {})

const alias = fs.readdirSync(pathConfig.src).reduce((prev, cur) => {
    prev[cur] = resolve(pathConfig.src, cur)
    return prev
}, {})

const webpackConfig = {
    entry,
    output: {
        path: pathConfig.static,
        publicPath: pathConfig.public,
        filename: FILENAME
    },
    resolve: {
        modules: ['node_modules', resolve(pathConfig.root, 'node_modules')],
        extensions: ['.js', '.json', '.jsx', '.vue'],
        mainFields: ['browser', 'main'],
        alias
    },
    externals: {},
    performance: {
        hints: false,
        maxEntrypointSize: 1e2,
        maxAssetSize: 1e6,
        assetFilter: assetFileName => !(/\.map$/.test(assetFileName))
    },
    stats
}

if (isDev) {
    webpackConfig.devServer = {
        port,
        hot: true,
        filename: FILENAME,
        publicPath: pathConfig.public,
        stats,
        historyApiFallback: false,
        proxy: {}
    }
}

export default webpackConfig
