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
      { hid: 'og:title', name: 'og:title', content: gustavoConfig.title },
      { hid: 'og:description', name: 'og:description', content: gustavoConfig.description || gustavoConfig.title },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: gustavoConfig.favciconUrl || '/favicon.png' }
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
    '@nuxtjs/pwa',
    '@nuxtjs/component-cache',
    {
      src: '@nuxtjs/google-analytics',
      options: {
        ua: gustavoConfig.googleAnalyticsId
      }
    }
  ],
  plugins: [
    '~plugins/vue-moment',
    '~plugins/to-iso-date'
  ],
  router: {
    middleware: 'hide-nav'
  },
  gustavo: gustavoConfig
}
