const HtmlWebpackPlugin = require("html-webpack-plugin");
const defaultTag = require('./defaultTag.js');
const platforms = require('./readPlatform.js')

const options = {
  template: `./src/index.ejs`,
  // title: item,
  cache: false,
  // chunks: [item],
  minify: false, // 禁止html压缩 配合html-loader minimize: false
  hash: true,
  inject: "body",
  ...defaultTag
}

const plugins = platforms.map(plat => {
  return new HtmlWebpackPlugin({
    ...options,
    filename: `${plat.name}.html`,
    script_client: `<script type="text/javascript" defer>var PlatformConfig = ${plat.config}</script>`
  });
})

const developmentPlugins = new HtmlWebpackPlugin({
  ...options,
  filename: `index.html`,
  script_client: `<script type="text/javascript">var PlatformConfig = ${platforms[0].config}</script>`
});

module.exports = {
  entry: `./src/main.js`,
  plugins: process.env.NODE_ENV === 'development' ? [developmentPlugins] : [ ...plugins ]
}

