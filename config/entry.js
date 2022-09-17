const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require('glob');
const entry = {};
const plugins = [];

function loadModules () {
    const _path = './src/page/';
    const context = glob.sync(_path + '*');
    const modules = []
    context.forEach((_key) => {
        const key = _key.replace(_path, '');
        if (key === './index.js' || key === './index.ts' || /\.(j|t)s$/.test(key)) return
        modules.push(key);
    })
    return modules
}


loadModules().forEach((item,ind) => {
    // 入口
    entry[item] = `./src/page/${item}/index.js`;

    const htmlPlugin = new HtmlWebpackPlugin({
        template: `./src/page/${item}/index.html`,
        // template: `./config/index.ejs`,
        // base: `./src/page/${item}/index.html`,
        filename: `${item}.html`,
        title: item,
        // favicon: "src/assets/favicon.ico",
        cache: false,
        chunks: [item],
        minify: false, // 禁止html压缩 配合html-loader minimize: false
        hash: true,
        inject: true,
    });
    // 出口
    plugins.push(htmlPlugin);
});


module.exports = { entry, plugins }
