module.exports = {
  // 基本路径
  baseUrl: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},
  // 如果想要引入babel-polyfill可以这样写
  // configureWebpack: (config) => {
  //   config.entry = ["babel-polyfill", "./src/main.js"]
  // },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  // parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {},
  // 第三方插件配置
  // pluginOptions: {
  //   // ...
  // },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  transpileDependencies: [],
  configureWebpack: {},
  // webpack-dev-server 相关配置
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    hotOnly: false,
    open: true,
    https: false,
    proxy: {
      '/api': {
        // target: "http://100.112.45.189:8008", //内网开发
        // target: "http://wxcarcs.capli.com.cn:8008", //外网开发
        // target: "localhost:8082"
        target: 'http://100.112.45.189:8008',
        changeOrigin: true, // 改变源
        pathRewrite: {
          // "^/api": "http://100.112.45.189:8008" //路径重写 内网开发
          // "^/api": "http://wxcarcs.capli.com.cn:8008" //路径重写 外网开发
          // "^/api": "localhost:8082"
          '^/api': 'http://100.112.45.189:8008'
        }
      }
    }, // 设置代理
    overlay: {
      warnings: false,
      errors: true
    }
  }
}
