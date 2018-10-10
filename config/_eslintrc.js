module.exports = {
  root: true,
  env: {
    node: true
  },
  // What is the "Use the latest vue-eslint-parser" error?
  // https://github.com/vuejs/eslint-plugin-vue#readme
  // 1."extends": ["plugin:vue/recommended"]
  //   "extends": ["plugin:vue/base"]要包含其中一个
  // 2.parserOptions: {
  //        parser: 'babel-eslint'
  //   }
  // 将 bable-eslint写在parserOptions中
  extends: ['plugin:vue/base', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
