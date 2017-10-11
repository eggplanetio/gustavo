import proxy from 'express-http-proxy'
import config from '../../nuxt.config.js'

const githubToken = config.gustavo.githubToken || process.env.GITHUB_TOKEN
const gistId = config.gustavo.gistId || process.env.GIST_ID

/* eslint-disable no-console */
if (typeof githubToken === 'undefined') {
  console.warn(`Github Token not provided. You will be rate limited.`)
}

if (!gistId) {
  throw new Error(`No Gist ID found in config or via ENV variable.`)
}

const url = `api.github.com`

const defaults = {
  https: true,
  proxyReqPathResolver: (req) => {
    return `/gists/${gistId}`
  },
  proxyReqOptDecorator (proxyReqOpts, srcReq) {
    proxyReqOpts.headers['Authorization'] = `token ${githubToken}`
    return proxyReqOpts
  }
}

export const post = proxy(url, Object.assign({}, defaults, {
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    let files = JSON.parse(proxyResData.toString('utf8')).files
    const fileNames = Object.keys(files)
    const fileName = fileNames.find(name => name === `${userReq.params.id}.post.md`)

    if (!fileName) {
      userRes.status(404)
      return 'Not found.'
    } else {
      return JSON.stringify({ post: files[fileName] })
    }
  }
}))

export const page = proxy(url, Object.assign({}, defaults, {
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    let files = JSON.parse(proxyResData.toString('utf8')).files
    const fileNames = Object.keys(files)
    const fileName = fileNames.find(name => name === `${userReq.params.id}.page.md`)

    if (!fileName) {
      userRes.status(404)
      return 'Not found.'
    } else {
      return JSON.stringify({ page: files[fileName] })
    }
  }
}))

export const posts = proxy(url, Object.assign({}, defaults, {
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    let files = JSON.parse(proxyResData.toString('utf8')).files
    const fileNames = Object.keys(files)
    const posts = []

    fileNames
      .filter(name => !name.endsWith('.draft.post.md'))
      .forEach(name => {
        if (name.endsWith('.post.md')) {
          posts.push(files[name])
        }
      })

    return JSON.stringify({ posts })
  }
}))

export const links = proxy(url, Object.assign({}, defaults, {
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    let files = JSON.parse(proxyResData.toString('utf8')).files
    const links = files[`links.md`]
    return JSON.stringify({ links })
  }
}))
