const webpack = require('webpack')

module.exports = {
  build: {
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/),
      new webpack.IgnorePlugin(/xmldom$/)
    ]
  },
  srcDir: __dirname,
  head: {
    title: 'gus',
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
  loading: { color: '#000' },
  plugins: [
    // '~plugins/vue-hljs',
    '~plugins/vue-moment'
  ]
}
