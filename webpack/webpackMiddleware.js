// koa 线下开发环境打包, 热更新

const fs = require('fs');
const webpack = require('webpack');
const {hotMiddleware} = require('koa-webpack-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
import webpackConfig from './webpack.config.babel'

webpackConfig.entry = {
    demo: [
        'webpack-hot-middleware/client',
        '/Users/shuoshubao/Documents/shuoshubao.github.io/src/view/demo.js'
    ]
}

module.exports = function (app) {
    const compiler = webpack(webpackConfig);
    const devMiddlewareInstance = webpackDevMiddleware(compiler, {
        publicPath: '/',
        stats: {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }
    });
    devMiddlewareInstance.waitUntilValid(function(){
        console.log('webpack is ready');
    });


    // 判断假如访问的路径是.html结尾的, 就去生成对应的html文件
    app.use(function*(next){
        console.log('111')
        if (this.path === '/' || /\.html$/.test(this.path)) {
            console.log(this.path)
        } else {
            yield next;
        }
    });

    app.use(async (ctx, next)=> {
        // 假如请求html页面或者静态资源
        ctx.status = 200;
        await devMiddlewareInstance(ctx.req, ctx.res, async ()=> {
            await next();
        });

    });

    app.use(hotMiddleware(compiler));

};
