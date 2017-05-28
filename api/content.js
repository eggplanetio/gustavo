const router = require('express').Router()
const requestProxy = require('express-request-proxy')
const config = require('../lib/config')

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

/* eslint-disable no-console */
if (typeof githubToken === 'undefined') {
  console.warn(`Github Token not provided. You will be rate limited.`)
}

if (!gistId) {
  throw new Error(`No Gist ID found in config or via ENV variable.`)
}

router.get('/content', requestProxy(opts))
module.exports = router
