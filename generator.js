module.exports = (api, options, rootOptions) => {
  if (options.wechartEnv) {
    console.log("需要在微信环境中进行使用");
  }
  if (options.needLinkme) {
    console.log("需要使用深度链接功能");
  }
  // 插件通用配置项
  api.extendPackage({
    dependencies: {
      axios: "^0.18.0",
      vuex: "^3.0.1",
      "vue-router": "^3.0.1",
      vconsole: "^3.2.0",
      "vue-axios": "^2.1.3",
      vant: "^1.3.3",
      vconsole: "^3.2.0"
    },
    devDependencies: {
      autoprefixer: "^7.1.2",
      "babel-plugin-import": "^1.9.1",
      "babel-plugin-transform-vue-jsx": "^3.5.0",
      "babel-plugin-import": "^1.8.0",
      "babel-plugin-syntax-jsx": "^6.18.0",
      "css-loader": "^0.28.0",
      chalk: "^2.0.1",
      eslint: "^5.6.1",
      "eslint-loader": "^2.1.1",
      "eslint-plugin-import": "^2.7.0",
      "eslint-plugin-node": "^7.0.0",
      "eslint-plugin-promise": "^4.0.0",
      "eslint-plugin-standard": "^4.0.0",
      "eslint-plugin-vue": "^4.0.0",
      ora: "^1.2.0",
      "postcss-cssnext": "^3.1.0",
      "postcss-import": "^11.0.0",
      "postcss-loader": "^2.0.8",
      "postcss-url": "^7.2.1",
      "postcss-write-svg": "github:jonathantneal/postcss-write-svg",
      "postcss-px-to-viewport": "0.0.3",
      "url-loader": "^1.1.1",
      "vue-loader": "^15.4.2",
      "vue-style-loader": "^3.0.1",
      "vue-template-compiler": "^2.5.2",
      rimraf: "^2.6.0",
      semver: "^5.5.1"
    }
  });

  api.render({
    "./.browserslistrc": "./config/_browserslistrc",
    "./babel.config.js": "./config/babel.config.js",
    "./.env.development": "./config/_env.development",
    "./.env.production": "./config/_env.production",
    "./.env.test": "./config/_env.test",
    "./src/assets/js/functionality.js": "./config/js/functionality.js",
    "./src/assets/js/register.js": "./config/js/register.js",
    "./src/assets/js/validateRules.js": "./config/js/validateRules.js",
    "./vue.config.js": "./config/vue.config.js",
    "./README.md": "./config/README.md"
  });
};
