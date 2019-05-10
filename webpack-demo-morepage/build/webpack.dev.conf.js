const webpack = require('webpack')

const path = require('path')

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
        new webpack.NamedModulesPlugin()
    ]
}
