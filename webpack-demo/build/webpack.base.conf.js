const webpack = require('webpack')
const merge = require('webpack-merge') // 合并webpack配置文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将 css 单独打包成文件
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理打包的文件夹
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const path = require('path')
const fs = require('fs')

const productionConfig = require('./webpack.prod.conf.js') // 引入生产环境配置文件
const developmentConfig = require('./webpack.dev.conf.js') // 引入开发环境配置文件



const generateConfig = env => {
    let scriptLoader = [
        {
            loader: 'babel-loader'
        }
    ]

    let cssLoader = [
        'style-loader',
        'css-loader',
        'postcss-loader'
    ]

    let cssExtractLoader = [
        {
            loader: MiniCssExtractPlugin.loader
        },
        'css-loader',
        'postcss-loader'
    ]

    let fontLoader = [
        {
            loader: 'url-loader',
            options: {
                name: '[name].[hash:8].min.[ext]',
                limit: 5000,
                publicPath: 'fonts/',
                outputPath: 'fonts/'
            }
        }
    ]

    let imageLoader = [
        {
            loader: 'url-loader',
            options: {
                name: '[name].[hash:8].min.[ext]',
                limit: 10000,
                outputPath: 'images/'
            }
        },
        {
            loader: 'image-webpack-loader',
            options: {
                mozjpeg: {
                    progressive: true,
                    quality: 75
                },
                pngquant: {
                    quality: '65-90',
                    speed: 4
                }
            }
        }
    ]

    let styleLoader = env === 'production' ? cssExtractLoader : cssLoader

    let plugins = [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack4 实战',
            filename: 'index.html',
            template: path.resolve(__dirname, '..', 'index.html'),
            minify: {
                collapseWhitespace: true
            }
        }),
    ]
    const files = fs.readdirSync(path.resolve(__dirname, '../dll')) // 读取 dll 中的文件
    // 插入plugins
    files.forEach(file => {
        if (/.*\.dll.js/.test(file)) {
            plugins.push(
                new AddAssetHtmlWebpackPlugin({
                    filepath: path.resolve(__dirname, '../dll', file)
                })
            )
        }
        if (/.*\.manifest.json/.test(file)) {
            plugins.push(
                new webpack.DllReferencePlugin({
                    manifest: path.resolve(__dirname, '../dll', file)
                })
            )
        }
    })

    return {
        entry: {
            app: './src/app.js'
        },
        output: {
            publicPath: env === 'development' ? '/' : './',
            path: path.resolve(__dirname, '..', 'dist'),
            filename: '[name].[hash:8].bundle.js',
            chunkFilename: '[name].[hash:8].chunk.js'
        },
        module: {
            rules: [
                { test: /\.js$/, exclude: /(node_modules)/, use: scriptLoader },
                { test: /\.(sa|sc|c)ss$/, use: styleLoader },
                { test: /\.(eot|woff2?|ttf|svg)$/, use: fontLoader },
                { test: /\.(png|jpg|jpeg|gif)$/, use: imageLoader }
            ]
        },
        plugins: plugins
    }
}

module.exports = env => {
    let config = env === 'production' ? productionConfig : developmentConfig
    return merge(generateConfig(env), config)
}