import { resolve } from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export const port = 8080
export const isDev = process.env.NODE_ENV === 'development'
export const FILENAME = `[name]${isDev ? '' : '.[chunkhash]'}.js`

const ROOT = process.cwd()

export const pathConfig = {
    root: process.cwd(),
    src: resolve(ROOT, 'src'),
    build: resolve(ROOT, 'build'),
    public: '/build/static',
    static: resolve(ROOT, '/build/static'),
    view: resolve(ROOT, 'src/view'),
    dll: resolve(ROOT, '.temp/dll'),
    asset: resolve(ROOT, '.temp/asset')
}

export const dllEntry = {
    react: [
        'react',
        'react-dom',
        'prop-types'
    ],
    tools: ['classnames']
}

export const stats = {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    hash: false,
    version: false
}

export const extractLESS = new ExtractTextPlugin(`[name]${isDev ? '' : '.[chunkhash]'}.css`)

export const templateContent = ({ htmlWebpackPlugin }) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${htmlWebpackPlugin.options.title}</title>
        </head>
        <body>
            <div id="app"></div>
        </body>
        </html>
    `
}

export const minifyHtmlConfig = {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true,
    removeScriptTypeAttributes: true,
    removeStyleTypeAttributes: true,
    sortAttributes: true,
    sortClassName: true,
    keepClosingSlash: false
}

export const webpackProvideConfig = {
    $: 'jquery',
    jQuery: 'jquery',
    _: 'lodash',
    moment: 'moment',
    React: 'react',
    ReactDOM: 'react-dom',
    PureRenderMixin: 'react-addons-pure-render-mixin',
    PropTypes: 'prop-types',
    classnames: 'classnames',
    Vue: 'vue'
}

export const uglifyJSConfig = isDev ? {} : {
    uglifyJS: {
        compress: {
            warnings: false,
            collapse_vars: true,
            reduce_vars: true
        }
    }
}
