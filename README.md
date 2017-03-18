<img src="https://cloud.githubusercontent.com/assets/659829/24068803/551b203a-0b55-11e7-8322-6440783756b2.png">

> A blogging platform built atop Nuxt & Gist.

### Contents

- [Demo](https://briangonzalez.org)
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
docker build -t my-gustavo-blog .
docker run -p 3000:3000 my-gustavo-blog
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

- [Logo](https://thenounproject.com/search/?q=man&i=542085)
