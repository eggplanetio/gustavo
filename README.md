<img src="https://cloud.githubusercontent.com/assets/659829/23952199/ddf65190-094d-11e7-87cf-e8ff8f498777.png">

> A blogging platform built atop Nuxt & Gist.

### Getting started

Create a `gustavo.config.js` file with the following (or use `ENV` variables):

```
module.exports = {
  githubToken: '<< token >>',
  gistId: '<< gist id >>'
}
````

### Deployment

Deploying gustavo is simple. Our reccomended method is Now by Zeit.

```
now secrets add gustavo-github-token=<TOKEN>
now secrets add gustavo-gist-id=<ID>
now -e GITHUB_TOKEN=@gustavo-github-token -e GIST_ID=@gustavo-gist-id --docker
```

### License

MIT
