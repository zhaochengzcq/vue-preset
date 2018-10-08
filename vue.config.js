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
      .set("assets", "@/assets")
      .set("css", "@/assets/css")
      .set("img", "@/assets/img")
      .set("js", "@/assets/js");
  },
  devServer: {
    host: "localhost",
    port: 8080,
    hot: true,
    hotOnly: false,
    open: true,
    https: false,
    overlay: {
      warnings: false,
      errors: true
    }
  }
};
