const HtmlWebpackPlugin = require("html-webpack-plugin");
const defaultTag = require('./defaultTag');

const htmlPlugin = new HtmlWebpackPlugin({
  template: `./config/index.ejs`,
  // template: `./config/index.ejs`,
  // base: `./src/page/${item}/index.html`,
  filename: `index.html`,
  // favicon: "src/assets/favicon.ico",
  cache: false,
  chunks: ['index'],
  minify: false, // 禁止html压缩 配合html-loader minimize: false
  inject: 'body',
  ...defaultTag,
});

module.exports = { entry: `./src/page/index/index.js`, plugins: [htmlPlugin] }
