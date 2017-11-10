// koa 线下开发环境打包, 热更新
import fs from 'fs'
import webpack from 'webpack'
import singleEntryPlugin from 'webpack/lib/SingleEntryPlugin'
import HtmlwebpackPlugin from 'html-webpack-plugin'
import { hotMiddleware } from 'koa-webpack-middleware'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.babel'
import { pathConfig, templateContent } from '../config'

const entryCopy = {...webpackConfig.entry}

webpackConfig.entry = {
    common: ['webpack-hot-middleware/client', pathConfig.common]
}

/*
 * 以下代码为了解决webpack 第一次启动重启很多次的bug
 * https://github.com/webpack/watchpack/issues/25
 * */
const utimeFun = strPath => {
    const now = Date.now() / 1000
    const then = now - 10
    fs.utimes(strPath, then, then, err => {
        if (err) throw err
    })
}
const setFileUtime = entryPath => {
    if (Array.isArray(entryPath)) {
        entryPath.forEach(utimeFun)
    } else {
        utimeFun(entryPath)
    }
}

function getSingleHtmlPlugin(page) {
    setFileUtime(page.entryPath)
    return new HtmlwebpackPlugin({
        cache: true,
        chunks: ['common', page.outputPath],
        filename: `${page.outputPath}.html`,
        template: pathConfig.template
    })
}

export default app => {
    const htmlCache = {}
    const compiler = webpack(webpackConfig)
    const devMiddlewareInstance = webpackDevMiddleware(compiler, {
        publicPath: pathConfig.public,
        stats: webpackConfig.stats
    })
    devMiddlewareInstance.waitUntilValid(() => console.log('请开始你的表演'))

    // 判断假如访问的路径是.html结尾的, 就去生成对应的html文件
    app.use(async (ctx, next) => {
        if (ctx.path.startsWith('/build') && ctx.path.endsWith('.html')) {
            // 根据path得到pageListData中对应的entry
            const entry = ctx.path.replace('.html', '').split('/').slice(2).join('/')
            if (htmlCache[entry]) {
                await next()
            } else {
                if (entry in entryCopy) {
                    // 添加一个entry
                    compiler.apply(new singleEntryPlugin(pathConfig.root, entryCopy[entry], entry))
                    // 添加一个plugin
                    compiler.apply(getSingleHtmlPlugin({
                        entryPath: entryCopy[entry],
                        outputPath: entry
                    }))
                    // 触发重新编译
                    devMiddlewareInstance.invalidate()
                    htmlCache[entry] = true
                    await next()
                }
            }
        } else {
            await next()
        }
    })

    app.use(async (ctx, next) => {
        // 假如请求html页面或者静态资源
        ctx.status = 200
        await devMiddlewareInstance(ctx.req, ctx.res, async () => {
            await next()
        })
    })

    app.use(hotMiddleware(compiler))
}
