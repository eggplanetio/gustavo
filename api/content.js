const path = require('path')
const router = require('express').Router()
const requestProxy = require('express-request-proxy')

let config

try {
  config = require(path.join(process.cwd(), './gustavo.config'))
} catch (error) {
  console.log('No gustavo.config.js file found in current directory, falling back to env') // eslint-disable-line no-console
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

  /* eslint-disable no-console */
if (typeof githubToken === 'undefined') {
  console.warn(`Github Token not provided. You will be rate limited.`)
}

if (!gistId) {
  throw new Error(`No Gist ID found in config or via ENV variable.`)
}

// router.get('/content', requestProxy(opts))
router.get('/content', (req, res) => {
  res.send({
    files: [
      {
        content: `
Lorem ipsum dolor sit amet, minim molestie argumentum est at, pri legere torquatos instructior ex. Vis id odio atomorum oportere, quem modo fabellas sit at, dicat semper est ne. Apeirian detraxit pri eu. No solum accusam has. Ius ne harum mundi clita, eu pro tation audiam.
Sed dicit necessitatibus in, id posse nominati eos. Ea vel dictas facilisi adipiscing, verear phaedrum sed ei, omnes oblique sanctus mea ex. Iudico pertinacia constituam cu eos. Te vel fugit libris, libris nemore no pri, graece oportere sea ea. Amet omnium epicuri cum te, sonet dignissim abhorreant pro ea, mei petentium constituam ad. Suscipit gloriatur necessitatibus has et.
Eum at omnis omnesque percipitur, est ei melius scriptorem. At copiosae placerat vim, pro at sumo argumentum theophrastus, periculis theophrastus per et. No voluptatum contentiones eum, dolorem perfecto cu duo, duo eros nonumes ea. An has quaeque vivendum, iriure constituam ne nam. Electram maiestatis nec no.

<meta content="Surfing with Jeff" name="title">
<meta content="12/12/2016" name="date">
<meta content="Brian Gonzalez" name="author_">
        `,
        filename: 'foo.post.md'
      }
    ]
  })
})
module.exports = router
