import nuxt from 'nuxt'
import express from 'express'
import api from './api'
import morgan from 'morgan'
import config from '../nuxt.config.js'

// Shouldn't throw.
require(process.cwd() + '/gustavo.config')

const {
  Nuxt,
  Builder
} = nuxt

config.dev = !(process.env.NODE_ENV === 'production')

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.use(morgan('tiny'))

app.use('/favicon.ico', (req, res) => res.end())
app.set('port', port)
app.use('/api', api)

const n = new Nuxt(config)
new Builder(n).build()

function start () {
  app.use(n.render)
  app.listen(port, host)
  console.log(`Server listening on ${host}:${port}`) // eslint-disable-line no-console
}

start()
