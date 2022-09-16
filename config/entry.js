const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { re } = require("@babel/core/lib/vendor/import-meta-resolve");
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

const defaultConfig = require('./defultTag.js');

loadModules().forEach((item,ind) => {
    // 入口
    entry[item] = `./src/page/${item}/index.js`;
    // const cssPlugin = new MiniCssExtractPlugin({
    //     filename: `css/${item}_${ind}_[name].css`,
    //     chunkFilename: `${item}_${ind}_[name]`,
    //     // ignoreOrder
    //     // insert
    //     // attributes
    //     // linkType
    //     // runtime
    //     // experimentalUseImportModule
    // })
    // // console.log('Source--------->', MiniCssExtractPlugin.CssModule.content)
    // plugins.push(cssPlugin);

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
        inject: "head",
        ...defaultConfig,
    });
    // 出口
    plugins.push(htmlPlugin);
});


module.exports = { entry, plugins }
