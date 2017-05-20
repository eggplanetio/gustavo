const webpack = require('webpack')
const gustavoConfig = require('./gustavo.config.js')

module.exports = {
  env: {
    runningPort: process.env.PORT || 3000
  },
  build: {
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/)
    ]
  },
  srcDir: __dirname,
  head: {
    title: gustavoConfig.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    { src: '~assets/css/main.scss', lang: 'scss' }
  ],
  loading: { color: 'black' },
  plugins: [
    // '~plugins/vue-hljs',
    '~plugins/ga',
    '~plugins/vue-moment',
    '~plugins/to-iso-date'
  ],
  router: {
    middleware: 'hide-nav'
  }
}
