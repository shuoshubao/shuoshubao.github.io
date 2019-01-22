module.exports = {
    title: 'WEB前端开发',
    port: 9000,
    enableEslint: false,
    styles: ['scss'],
    pathConfig: {
        global: 'src/common.js'
    },
    devServer: {
        /*proxy: {
            '/api': 'http://localhost:9000/'
        }*/
        headers: {
            "Author": "shuoshubao"
        }
    }
}
