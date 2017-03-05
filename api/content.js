const path = require('path')
const router = require('express').Router()
const requestProxy = require('express-request-proxy')

let config

try {
  config = require(path.join(process.cwd(), './gus.config'))
} catch (error) {
  console.log('No gus.config.js file found in current directory, falling back to env') // eslint-disable-line no-console
  config = {}
}

const githubToken = config.githubToken || process.env.GITHUB_TOKEN
const gistId = config.gistId || process.env.GIST_ID

const opts = {
  url: `https://api.github.com/gists/${gistId}`
}

if (githubToken) {
  opts['headers'] = {
    'Authorization': `token ${githubToken}`
  }
}

router.get('/content', requestProxy(opts))
module.exports = router
