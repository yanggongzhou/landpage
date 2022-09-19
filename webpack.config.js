const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const devServer = require('./config/devServer.js')
const { entry, plugins } = require('./config/entry.js')

const mode = process.env.NODE_ENV;

const config = {
    mode: mode,
    devtool: 'source-map',
    entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: {
            keep: /assets\//,
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),
                use: 'babel-loader',
            },
            {
                test: /\.(sc|c)ss$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader'},
                    { loader: 'sass-loader' }
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
                        maxSize: 2 * 1024 // 4kb
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
    // externals: {
    //     'jquery': 'window.jQuery'
    // },
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
    devServer,
};

module.exports = config;
