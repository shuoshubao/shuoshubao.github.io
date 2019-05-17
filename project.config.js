const isDevelopment = process.env.NODE_ENV === 'development';
module.exports = {
    title: 'WEB前端开发',
    port: 9000,
    enableEslint: false,
    styles: ['scss'],
    staticPrefix: '/dist',
    unpkgConfigList: {
        script: [
            'https://unpkg.com/babel-polyfill@6.26.0/dist/polyfill.min.js',
            isDevelopment ? 'https://unpkg.com/vue@2.6.10/dist/vue.js' : 'https://unpkg.com/vue@2.6.10/dist/vue.min.js',
            'https://unpkg.com/element-ui@2.8.2/lib/index.js',
        ],
        style: ['https://unpkg.com/element-ui@2.8.2/lib/theme-chalk/index.css'],
    },
    externals: {
        vue: 'Vue',
        'element-ui': 'ELEMENT',
    },
    pathConfig: {
        global: 'src/common.js',
        build: 'dist',
    },
    devServer: {
        /* proxy: {
            '/api': 'http://localhost:9000/'
        }, */
        headers: {
            Author: 'shuoshubao',
        },
    },
};
