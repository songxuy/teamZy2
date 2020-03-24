const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
    // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时，
    // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: 'node',
    // 对 bundle renderer 提供 source map 支持
    devtool: '#source-map',
    entry: './src/entry-server.js',
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        // 这是将服务器的整个输出
        // 构建为单个 JSON 文件的插件。
        // 默认文件名为 `vue-ssr-server-bundle.json`
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.template.html'),
            filename: 'index.template.html',
            files: {
              js: 'client.bundle.js'
            },
            excludeChunks: ['server']
        }),
        new VueSSRServerPlugin()
    ]
})
