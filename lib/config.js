const path = require('path')

let config

try {
  config = require(path.join(process.cwd(), './gustavo.config'))
} catch (error) {
  console.log('No gustavo.config.js file found in current directory, falling back to env') // eslint-disable-line no-console
  config = {}
}

module.exports = config
