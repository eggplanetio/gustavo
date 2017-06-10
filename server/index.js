import Nuxt from 'nuxt'
import express from 'express'
import api from './api'
import morgan from 'morgan'
import config from '../nuxt.config.js'

config.dev = !(process.env.NODE_ENV === 'production')

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

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
