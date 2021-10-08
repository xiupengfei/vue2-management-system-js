'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const proxy = require('./proxy.js')

const resolve = (dir) => path.join(__dirname, dir)

const name = defaultSettings.title || '' // 页面标题

const port = process.env.VUE_APP_PORT || 8080

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy,
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    performance: {
      // hints: 'warning',
      maxAssetSize: 614400, // 600KB
      // 入口起点的最大体积
      maxEntrypointSize: 2097152, // 2MB
    },
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    // 保留空白
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .options({
        inline: true,
        // publicPath: './'
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', (config) => config.devtool('cheap-source-map'))
    config
      .plugin('simple-progress-webpack-plugin')
      .use(require.resolve('simple-progress-webpack-plugin'), [
        {
          format: 'compact',
        },
      ])
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` 必须与RuntimeChunk名称相同, 默认为 `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()
      config.optimization.splitChunks({
        // 分包
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          vue: {
            name: 'chunk-vue',
            test: /[\\/]node_modules[\\/]_?vue(.*)/,
            priority: 20,
          },
          elementUI: {
            name: 'chunk-element-ui',
            priority: 18,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
          commons: {
            name: 'chunk-common-components',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      config.optimization.runtimeChunk('single')
    })
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
      },
    },
  },
}
