module.exports = {
    title: 'WEB前端开发',
    port: 9000,
    enableEslint: false,
    styles: ['scss'],
    staticPrefix: '/dist',
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
