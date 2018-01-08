module.exports = {
    title: 'WEB前端开发',
    port: 9000,
    dllEntry: [
        'react',
        'react-dom',
        'prop-types',
        'antd',
        'babel-polyfill',
        'classnames'
    ],
    pathConfig: {

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
