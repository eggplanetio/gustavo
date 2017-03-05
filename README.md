## gus

> A blogging platform built atop Nuxt & Gist.

### Getting started

Create a `gus.config.js` file with the following (or use `ENV` variables):

```
module.exports = {
  githubToken: '<< token >>',
  gistId: '<< gist id >>'
}
````

Then startup Gus:

```bash
export GITHUB_TOKEN=<< token >>
export GIST_ID=<< gist id >>

npm run dev   # development
npm start     # production
```

### License

MIT
