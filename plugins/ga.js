/* eslint-disable */

let config = require('../lib/config')
let googleAnalyticsId
if ('googleAnalyticsId' in config) googleAnalyticsId = config.googleAnalyticsId

if (process.BROWSER_BUILD) {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
      m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

  ga('create', googleAnalyticsId, 'auto')
  ga('send', 'pageview')

  window.onNuxtReady((app) => {
    app.$nuxt.$on('routeChanged', (to, from) => {
      ga('set', 'page', to.fullPath)
      ga('send', 'pageview')
    })
  })
}
