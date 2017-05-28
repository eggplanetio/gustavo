const Nuxt = require('nuxt')
const app = require('express')()

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.set('port', port)
app.use('/api', require('./api'))

// Import and Set Nuxt.js options.
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js.
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode.
if (config.dev) {
  nuxt.build()
    .catch((error) => {
      console.error(error) // eslint-disable-line no-console
      process.exit(1)
    })
}

// Logging and compression in production.
if (!config.dev) {
  const morgan = require('morgan')
  const compression = require('compression')
  app.use(compression)
  app.use(morgan('tiny'))
}

// Listen.
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
