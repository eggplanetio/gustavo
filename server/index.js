import Nuxt from 'nuxt'
import express from 'express'
import api from './api'
import morgan from 'morgan'
import compression from 'compression'
import config from '../nuxt.config.js'
import gustavoConfig from '../src/config'
import apicache from 'apicache'

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const cache = apicache.middleware
const cacheDuration = gustavoConfig.cacheDuration || '30 minutes'

// Caching.
app.get('/cache/index', (req, res) => {
  res.json(apicache.getIndex())
})

app.get('/cache/clear/:target?', (req, res) => {
  res.json(apicache.clear(req.params.target))
})

app.use(cache(cacheDuration))
app.set('port', port)
app.use('/api', api)

// Import and Set Nuxt.js options.
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js.
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in production mode.
if (!config.dev) {
  nuxt.build()
    .catch((error) => {
      console.error(error) // eslint-disable-line no-console
      process.exit(1)
    })

  // Logging and compression in production.
  app.use(compression)
  app.use(morgan('tiny'))
}

// Listen.
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
