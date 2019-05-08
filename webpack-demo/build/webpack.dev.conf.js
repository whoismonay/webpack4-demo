const webpack = require('webpack')

const path = require('path')

// 删除未使用的css
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map', // 调试源码
    devServer: {
        contentBase: path.join(__dirname, '../dist/'),
        port: 8080,
        hot: true,
        overlay: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
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
