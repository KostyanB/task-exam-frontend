const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const fs = require('fs');
const webp = require("imagemin-webp");

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

function generateHtmlPlugins(files) {
    const htmlPlugins = [];
    files.map(config => {
        const { filePath, outputPath, inject } = config;
        const templateFiles = fs.readdirSync(path.resolve(__dirname, filePath));
        templateFiles.map(item => {
            const parts = item.split('.');
            const name = parts[0];
            const extension = parts[1];
            const _filePath = path.resolve(__dirname, `${filePath}/${name}.${extension}`);
            htmlPlugins.push(
                new HtmlWebpackPlugin({
                    filename: `${outputPath}/${name}.html`,
                    template: `!!ejs-webpack-loader!${_filePath}`,
                    inject,
                    minify: {
                        collapseWhitespace: true,
                    }
                })
            )
        })
    });
    return htmlPlugins
}

const htmlPlugins = generateHtmlPlugins(ejsFiles);

const config = {
    mode: 'production',
    entry: './app/app.js',
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'bundle.js',
    },
    stats: {
        assets: false,
        children: false,
        warnings: false,
        usedExports: true
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: require.resolve("svg4everybody"),
                use: "imports-loader?this=>window"
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: "ejs-compiled-loader",
                        options: {}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        ...htmlPlugins,
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
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif)$/i,
            optipng: {
                optimizationLevel: 4
            },
            jpegtran: {
                progressive: true
            },
            plugins: [
                // webp({ quality: 75})
            ],
        }),
        new ImageminWebpWebpackPlugin({
            config: [
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    options: {
                        quality:  100
                    },
                }
            ],
            overrideExtension: false
        }),
        new SpriteLoaderPlugin({
            plainSprite: true
        }),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimizer: [
            new MinifyPlugin(),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};

module.exports = config;