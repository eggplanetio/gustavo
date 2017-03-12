const webpack = require('webpack')

module.exports = {
  build: {
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
    ]
  },
  srcDir: __dirname,
  head: {
    title: 'eggplanet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
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
  loading: { color: '#ac48c0' },
  plugins: [
    // '~plugins/vue-hljs',
    '~plugins/vue-moment',
    '~plugins/to-iso-date'
  ]
}
