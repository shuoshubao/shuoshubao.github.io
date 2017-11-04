import webpack from 'webpack'
import filesize from 'filesize'
import cliui from 'cliui'
import chalk from 'chalk'

// 打印带颜色的信息
export const log = (str, color) => console.log(color ? chalk[color](str) : str)

// 数组求和
export const sum = arr => arr.reduce((prev, cur) => prev + cur, 0)

// 数组去重
export const uniq = arr => Array.from(new Set(arr))

// 格式化webpack stats
const formatStats = stats => {
    const {
        startTime,
        endTime,
        compilation: { assets }
    } = stats
    const ui = cliui({ width: 50 })
    ui.div({
        text: `${chalk.green('统计:')} 耗时${chalk.cyan(endTime - startTime)}ms`,
        padding: [1, 0, 1, 0]
    })
    const renderTable = arr => ui.div(...arr.map(v => ({ text: v })))
    const data = Object.keys(assets).reduce((prev, cur) => {
        prev.push({
            name: cur,
            type: cur.split('.').slice(-1)[0],
            size: assets[cur].size()
        })
        return prev
    }, [])
    const tableThead = ['类型', '数量', '文件大小'].map(v => chalk.cyan(v))
    renderTable(tableThead)
    uniq(data.map(v => v.type)).map(type => {
            const files = data.filter(v2 => v2.type === type)
            const { length: len } = files
            const size = sum(files.map(v => v.size))
            return { type, len, size }
        })
        .sort((a, b) => a.len - b.len)
        .forEach(({ type, len, size }) => renderTable([type, len, filesize(size)]))
    const tableFoot = ['总计', data.length, filesize(sum(data.map(v => v.size)))].map(v => chalk.green(v))
    renderTable(tableFoot)
    log(ui.toString())
}

// webpackCompiler
export const webpackCompiler = (webpackConfig, callback = () => {}) => new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)
    compiler.run((err, stats) => {
        if (err) {
            log('webpack 编译报错', 'red')
            log(err)
            if (err.details) {
                log(err.details, 'red')
            }
        } else {
            log(stats.toString(webpackConfig.stats))
            formatStats(stats)
            resolve()
        }
    })
    compiler.plugin('done', (stats) => {
        callback()
    })
})
