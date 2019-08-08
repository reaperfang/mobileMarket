'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')


module.exports = {

  //开发环境
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    host: '127.0.0.1',
    // host: '0.0.0.0',
    port: 9000, 
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',
    cssSourceMap: true,

    proxyTable: {
      '/data-server/**': {
        //target: 'http://172.22.146.2:8080', // 订单 尹茂凯
        // target: 'http://172.22.146.109:8080', // 商品 王浩
        //target: 'http://172.22.146.31:8080', // 客户 崔建
        //target: 'http://172.22.146.10:8080', //客户 刘亚凯
        // target: 'http://172.22.146.123:8080', // 客户 王杰
        // target: 'http://172.22.146.109:8080',
        target: 'http://172.22.146.133:8081',  //李雯廷
        // target: 'http://120.133.1.130:8012',//营销测试机
        // target:'http://172.22.146.124:8090',//许涛

        changeOrigin: true,
        pathRewrite: {
          '^/data-server': ''
        }
      },
      '/upload_server/**': {
        target: 'http://10.12.52.41:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/upload_server': ''
        }
      },
      '/upload_coupon_server/**': {
        target: 'http://172.22.134.121:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/upload_coupon_server': ''
        }
      }
    }
  },

    // 测试环境
  testBuild: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist-test/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist-test'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'cheap-module-eval-source-map',

    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

     // `npm run build:prod --generate_report`
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  },

  //生产环境
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'source-map',
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build:prod --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

    // `npm run build:prod --generate_report`
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}
