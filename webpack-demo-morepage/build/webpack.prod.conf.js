const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将 css 单独打包成文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css
// 删除未使用的css
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');

module.exports = {
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            // cacheGroups: {
            //     jquery: {
            //         name: 'chunk-jquery', // 单独将 jquery 拆包
            //         priority: 15,
            //         test: /[\\/]node_modules[\\/]jquery[\\/]/
            //     }
            // }
        }
    },
    plugins: [
        // 单独打包出css
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].bundle.min.css',
            chunkFilename: 'css/[name].[contenthash:8].chunk.min.css'
        }),
        // 压缩 css
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g, //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
            cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
            cssProcessorOptions: { //传递给 cssProcessor 的选项，默认为{}
                safe: true, 
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true //一个布尔值，指示插件是否可以将消息打印到控制台，默认为 true
        }),
        // 清除无用 css
        new PurifyCSS({
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(__dirname, './*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
                path.resolve(__dirname, './src/*.js')
            ])
        })
    ]
}