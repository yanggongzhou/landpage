const HtmlWebpackPlugin = require("html-webpack-plugin");
const defaultTag = require('./defaultTag');

const htmlPlugin = new HtmlWebpackPlugin({
  template: `./src/index.ejs`,
  filename: `index.html`,
  // title: item,
  cache: false,
  // chunks: [item],
  minify: false, // 禁止html压缩 配合html-loader minimize: false
  hash: true,
  inject: "body",
  ...defaultTag,
});
module.exports = { entry: `./src/main.js`, plugins: [ htmlPlugin ] }
