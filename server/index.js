import Nuxt from 'nuxt'
import express from 'express'
import api from './api'
import morgan from 'morgan'
import config from '../nuxt.config.js'
import apicache from 'apicache'

config.dev = !(process.env.NODE_ENV === 'production')

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

const cache = apicache.middleware
const cacheDuration = config.gustavo.cacheDuration || '30 minutes'
apicache.options({
  enabled: !config.dev
})

const shouldCache = req =>
  !req.path.startsWith('/_nuxt') &&
  !req.path.startsWith('/__webpack') &&
  !req.path.startsWith('/api')

app.use(cache(cacheDuration, shouldCache))
app.use(morgan('tiny'))

app.use('/favicon.ico', (req, res) => res.end())
app.set('port', port)
app.use('/api', api)

function start () {
  const nuxt = new Nuxt(config)
  app.use(nuxt.render)
  app.listen(port, host)
  console.log(`Server listening on ${host}:${port}`) // eslint-disable-line no-console
}

start()
