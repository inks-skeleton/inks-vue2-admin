'use strict'
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const {siteTitle, sassGlobalVar, devHost, devPort} = require('./src/config/compile')

module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: 'dist',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  productionSourceMap: false,
  // 构建时开启多进程处理babel编译
  parallel: require('os').cpus().length > 1,
  devServer: {
    open: true,
    port: devPort || 9528,
    host: devHost || '0.0.0.0',
    https: false,
    hotOnly: true,
    // 设置让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: false,
      errors: true
    }
  },
  chainWebpack (config) {
    // 设置留白
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development',
      config => {
        config
          .plugin('ScriptExtHtmlWebpackPlugin')
          .after('html')
          .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }])
          .end()
        config.optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // only package third parties that are initially dependent
            },
            elementUI: {
              name: 'chunk-elementUI', // split elementUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'), // can customize your rules
              minChunks: 3, //  minimum common number
              priority: 5,
              reuseExistingChunk: true
            }
          }
        })
        config.optimization.runtimeChunk('single')
      })
  }
}
