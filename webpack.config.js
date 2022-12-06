const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { entry, plugins } = require('./config/entry.js')

const mode = process.env.NODE_ENV;

const config = {
    mode: mode,
    devtool: 'source-map',
    entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        clean: {
            keep: /assets\//,
        },
    },
    module: {
        rules: [
            // { test: /\.txt$/, use: 'babel-loader', },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),
                use: {
                  loader: 'babel-loader',
                },
            },
            {
                test: /\.(sc|c)ss$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: false } },
                    { loader: 'postcss-loader', options: { sourceMap: false } },
                    { loader: 'sass-loader', options: { sourceMap: false } }
                ]

            },
            {
                test: /\.html$/i,
                use: {
                    loader: "html-loader",
                    options: {
                        minimize: false,
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'assets/images/[name][ext][query]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 1024 * 1024 // 1024k 默认压缩
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext][query]'
                },
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `[name].css`,
        }),
        ...plugins,
    ],
    externals: {
      'ClipboardJS': 'window.ClipboardJS'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'initial',
                    priority: 2,
                    minChunks: 2,
                },
            }
        }
    },
    devServer: {
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
    },
};

module.exports = config;
