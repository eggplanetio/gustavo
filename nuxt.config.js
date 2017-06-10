const webpack = require('webpack')
const gustavoConfig = require('./gustavo.config')

module.exports = {
  env: {
    runningPort: process.env.PORT || 3000
  },
  build: {
    vendor: ['axios'],
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    { src: '~assets/css/main.scss', lang: 'scss' }
  ],
  loading: {
    color: gustavoConfig.loadingColor || 'black'
  },
  modules: [
    '@nuxtjs/workbox',
    ['@nuxtjs/google-analytics', { ua: gustavoConfig.googleAnalyticsId }]
  ],
  plugins: [
    // '~plugins/vue-hljs',
    '~plugins/vue-moment',
    '~plugins/to-iso-date'
  ],
  router: {
    middleware: 'hide-nav'
  },
  gustavo: gustavoConfig
}
