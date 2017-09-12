import fs from 'fs'
import webpack from 'webpack'
import filesize from 'filesize'
import table from 'table'
import {log} from './util'

const webpackCompiler = (webpackConfig, callback = () => {}) => new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)
    compiler.run((err, stats) => {
        if(err) {
            log('webpack 编译报错', 'red')
            log(err)
            if (err.details) {
                log(err.details, 'red')
            }
        }else {
            log(stats.toString(webpackConfig.stats))
            formatStats(stats)
            resolve()
        }
    })
    compiler.plugin('done', (stats) => {
        callback()
    })
})

const sum = arr => arr.reduce((prev, cur) => prev + cur, 0)
const uniq = arr => Array.from(new Set(arr))

const formatStats = stats => {
    const {assets} = stats.compilation
    const data = Object.keys(assets).reduce((prev, cur) => {
        prev.push({
            name: cur,
            type: cur.split('.').slice(-1)[0],
            size: assets[cur].size()
        })
        return prev
    }, [])
    const tableData = [['类型', '数量', '文件大小']]
    tableData.push(...uniq(data.map(v => v.type)).map(v => {
        const files = data.filter(v2 => v2.type === v)
        const {length: len} = files
        const size = filesize(sum(files.map(v => v.size)))
        return [v, len, size]
    }))
    tableData.push(['总计', data.length, filesize(sum(data.map(v => v.size)))])
    const tableConfig = {
        columns: {
            0: {width: 10},
            1: {width: 5},
            2: {width: 20}
        }
    }
    log(table(tableData, tableConfig))
}

export const webpackDllBuild = async () => {
    const webpackDllConfig = require('./webpack.dll.config.babel.js').default
    await webpackCompiler(webpackDllConfig)
}

export const webpackBuild = async () => {
    const webpackConfig = require('./webpack.config.babel.js').default
    await webpackCompiler(webpackConfig)
}
