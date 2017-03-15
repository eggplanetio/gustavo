<img src="https://cloud.githubusercontent.com/assets/659829/23951322/ffb6a288-094a-11e7-848b-2806855a04fc.png">

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
