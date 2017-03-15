<img src="https://cloud.githubusercontent.com/assets/659829/23952199/ddf65190-094d-11e7-87cf-e8ff8f498777.png">

> A blogging platform built atop Nuxt & Gist.

### Contents

- [Getting Started](#getting-started)
- [Running locally](#running-locally)
- [Deployment](#deployment)

## Getting started

Step 1, create `gustavo.config.js` with the following:

```js
module.exports = {
  title: 'My gustavo blog',
  githubToken: '<< token >>',
  gistId: '<< gist id >>'
}
````

Step 2, create a `Dockerfile` with the following:

```docker
FROM eggplanet/gustavo:latest
```

You're all done!

## Running locally

Now let's start it up:

```
docker build -t my-gus-blog .
docker run my-gus-blog --port 3000:3000
```

Your blog will be running at http://localhost:3000

## Deployment

Deploying gustavo is simple. Our reccomended method is [Now by Zeit](https://zeit.co/now).

```bash
now secrets add gustavo-github-token=<TOKEN>
now secrets add gustavo-gist-id=<ID>
now -e GITHUB_TOKEN=@gustavo-github-token -e GIST_ID=@gustavo-gist-id --docker
```

### License

- MIT

### Credits

- [Logo by Awais Rashid Khan from the Noun Project](https://thenounproject.com/search/?q=man+hat&i=31120)
