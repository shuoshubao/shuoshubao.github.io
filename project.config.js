module.exports = {
    title: 'WEB前端开发',
    port: 9000,
    enableEslint: false,
    styles: ['scss'],
    // staticPrefix: '/dist',
    staticPrefix: 'https://raw.githubusercontent.com/shuoshubao/shuoshubao.github.io/master/dist',
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
