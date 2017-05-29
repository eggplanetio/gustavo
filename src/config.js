const path = require('path')

let config

try {
  config = require(path.join(process.cwd(), './gustavo.config'))
} catch (error) {
  config = {}
}

module.exports = config
