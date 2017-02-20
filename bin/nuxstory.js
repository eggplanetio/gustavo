#!/usr/bin/env node

const execSync = require('child_process').execSync

console.log('Starting nuxstory...')
const out = execSync(
  './node_modules/.bin/nodemon --exec babel-node -w server.js -w nuxt.config.js -w api/ server.js',
  {stdio: [0, 1, 2]}
 )
