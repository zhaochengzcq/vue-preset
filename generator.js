module.exports = (api, options, rootOptions) => {
  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      vue: "^2.5.17",
      "vue-router": "^3.0.1",
      vuex: "^3.0.1",
      axios: "^0.18.0",
      vconsole: "^3.2.0",
      "vue-axios": "^2.1.3",
      vant: "^1.3.3"
    },
    devDependencies: {
      "@vue/cli-plugin-babel": "^3.0.4",
      "@vue/cli-plugin-eslint": "^3.0.4",
      "@vue/cli-service": "^3.0.4",
      "@vue/eslint-config-standard": "^3.0.4",
      "postcss-px-to-viewport": "0.0.3",
      "vue-template-compiler": "^2.5.2",
      autoprefixer: "^7.1.2",
      "css-loader": "^0.28.0",
      ora: "^1.2.0",
      "postcss-cssnext": "^3.1.0",
      "postcss-import": "^11.0.0",
      "postcss-loader": "^2.0.8",
      "postcss-url": "^7.2.1",
      "postcss-write-svg": "github:jonathantneal/postcss-write-svg",
      "url-loader": "^1.1.1",
      "vue-loader": "^15.4.2",
      "vue-style-loader": "^3.0.1"
    }
  });

    api.render("./template/vuex");
  }


  // 公共基础目录和文件
  api.render("./template/default");

  // 配置文件
  api.render({
    "./.eslintrc.js": "./template/_eslintrc.js",
    "./.gitignore": "./template/_gitignore",
    "./.postcssrc.js": "./template/_postcssrc.js"
  });
};
