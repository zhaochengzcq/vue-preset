module.exports = {
  css: {
    modules: false,
    sourceMap: false,
    loaderOptions: {}
  },
  productionSourceMap: false,
  transpileDependencies: [],
  configureWebpack: config => {
    //
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('assets', '@/assets')
      .set('css', '@/assets/css')
      .set('data', '@/assets/data')
  },
  devServer: {
    host: 'localhost',
    port: 2019,
    hot: true,
    hotOnly: false,
    open: true,
    https: false,
    overlay: {
      warnings: false,
      errors: true
    }
  }
}
