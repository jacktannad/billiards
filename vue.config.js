const {defineConfig} = require('@vue/cli-service')
const path = require('path')

const {
    publicPath,
    outputDir,
    assetsDir,
    transpileDependencies,
    port
} = require("./src/config/cli.config.js")

const {
    appTitle
} = require("./src/config/system.config.js")

// const resolve = (dir) => path.join(__dirname, dir)

module.exports = defineConfig({
    publicPath: publicPath,
    outputDir: outputDir,
    assetsDir: assetsDir,
    transpileDependencies: transpileDependencies,
    devServer: {
        host:"127.0.0.1",
        port: port,
        client: {
            overlay: false
        },
    },
    chainWebpack(config) {
        config.plugin('html').tap((args) => {
            args[0].title = appTitle;
            return args;
        })
    },
    // Webpack配置
    configureWebpack: {
        resolve: {
            alias: {
                // '@': resolve('src'), // cli 3 自带配置
            }
        },
        // 关闭 webpack 的性能提示
        performance: {
            hints: false
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "library/variables/columnsLayoutVariables.scss";`
            }
        }
    },
})
