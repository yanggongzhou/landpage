const { pages } = require("../src/main.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const entry = {};
const plugins = [];

pages.forEach(item => {
    console.log('item.name------------->', item.name)
    //入口
    entry[item.name] = `./src/page/${item.name}/index.js`;
    const htmlPlugin = new HtmlWebpackPlugin({
        template: `./src/page/${item.name}/index.html`,
        filename: `${item.name}.html`,
        title: item.title,
        // favicon: "src/assets/favicon.ico",
        cache: false,
        chunks: [item.name],
        minify: {
            // removeComments: true, //去掉注释
            collapseWhitespace: true, //去除空格
        }
    });
    //出口
    plugins.push(htmlPlugin);
});


module.exports = { entry, plugins }