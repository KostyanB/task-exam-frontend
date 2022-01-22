const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const fs = require('fs');

const ejsFiles = [
    {
        filePath: './app/pages/',
        outputPath: './',
        inject: true
    },
    {
        filePath: './app/templates/',
        outputPath: './templates',
        inject: false
    },
];

class EjsPlugin {
    constructor() {
        this.pluginInstances = [];
    }
    apply(compiler) {
        compiler.hooks.watchRun.tap('EjsPlugin', () => {
            ejsFiles.forEach(config => {
                const { filePath, outputPath, inject } = config;
                const filePaths = this.getFiles(filePath);

                filePaths.forEach(name => {
                    const pluginExist = this.pluginInstances.find(p => {
                        const pluginName = p.options.id.split('.')[0];
                        const fileName = name.split('.')[0];
                        return pluginName === fileName
                    });

                    if (!pluginExist) {
                        const _filePath = path.resolve(__dirname, `${filePath}/${name.split('.')[0]}.${name.split('.')[1]}`);

                        const plugin = new HtmlWebpackPlugin({
                            filename: `${outputPath}/${name.split('.')[0]}.html`,
                            template: `!!ejs-webpack-loader!${_filePath}`,
                            id: name,
                            inject,
                        });

                        plugin.apply(compiler);

                        this.pluginInstances.push(plugin);
                        return true;
                    } else {
                        return false;
                    }
                });
            })
        });
    }
    getFiles(pathname) {
        const templateFiles = fs.readdirSync(path.resolve(__dirname, pathname));
        return templateFiles.map(item => item)
    }
}

const config = {
    mode: 'development',
    entry: './app/app.js',
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'bundle.js',
    },
    stats: {
        assets: true,
        children: false,
        warnings: true,
        usedExports: false
    },
    devServer: {
        contentBase: './assets',
        historyApiFallback: true,
        hot: true,
        watchContentBase: true,
        before(app, server) {
            server._watch("./app/**/*.ejs");
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: "ejs-webpack-loader",
                        options: {}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, 'postcss.config.js'),
                            },
                        },
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)($|\?)|\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
                exclude: path.resolve(__dirname, 'app/icons/'),
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                },
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                exclude: path.resolve(__dirname, 'app/fonts/'),
                options: {
                    extract: true,
                    spriteFilename: 'icons.svg',
                }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new EjsPlugin(),
        // new HtmlWebpackHarddiskPlugin(),
        new CopyWebpackPlugin([
            {
                from: './app/fonts',
                to: './fonts'
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: './app/icons',
                to: './icons'
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: './app/images',
                to: './images'
            }
        ]),
        new SpriteLoaderPlugin({
            plainSprite: true
        }),
    ],
};

module.exports = config;