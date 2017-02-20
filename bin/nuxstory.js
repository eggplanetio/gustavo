#!/usr/bin/env node

const execSync = require('child_process').execSync

execSync(
  `./node_modules/babel-node server.js`,
  {stdio: [0, 1, 2]}
)
