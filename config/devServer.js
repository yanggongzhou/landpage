const path = require('path');
// you can do some mock/proxy, or other things
module.exports = {
    static: {
        directory: path.join(__dirname, 'public'),
    },
    compress: true,
    open: true,
    port: 9000,
    proxy: {
        '/dzapi': {
            target: 'http://192.168.0.241:8080',
            // target: 'http://127.0.0.1:7001',
            changeOrigin: true,
            pathRewrite: {
                '^/dzapi': ''
            }
        }
    },
}