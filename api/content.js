const path = require('path')
const router = require('express').Router()
const requestProxy = require('express-request-proxy')

const config = path.join(process.cwd() || require('nuxtstory.config'))
const githubToken = process.env.GITHUB_TOKEN || config.githubToken
const gistId = process.env.GIST_ID || config.gistId

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
