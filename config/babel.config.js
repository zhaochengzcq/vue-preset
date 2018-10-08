module.exports = {
  presets: ['@vue/app'],
  plugins: [
    'transform-vue-jsx',
    'transform-runtime',
    ['import', { libraryName: 'vant', style: true }]
  ]
}
