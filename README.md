<img src="https://cloud.githubusercontent.com/assets/659829/24072567/5e342bfc-0ba6-11e7-9c43-35d2cc192078.jpg">

> A (mostly) headless blogging platform built atop Nuxt & Gist.

[Demo](https://www.briangonzalez.org)

### Contents

- [Overview](#overview)
- [Creating Content](#creating-content)
- [Getting Started](#getting-started)
- [Deployment](#deployment)

## Overview

Gustavo is an opinionated, (mostly) [headless](https://headlesscms.org/) blogging platform
built to use:

- Github Gist
- Nuxt (Vue 2.0)
- Docker

By simply naming your files in a uniform matter, Gustavo can create a whole blog
for you in seconds. Don't believe me?
Check out the [gist](https://gist.github.com/briangonzalez/2ece66bfffff31ddc230ca8342e80b3e) that is [my blog](https://briangonzalez.org).

## Creating content

You can create content for your blog by simply creating
files in a gist that follow this schema:

| Type        | Naming                  | Example                                                                                                             |
|-------------|-------------------------| --------------------------------------------------------------------------------------------------------------------|
| post        | `{name}.post.md`        | [link](https://gist.github.com/briangonzalez/2ece66bfffff31ddc230ca8342e80b3e#file-lazy-leadership-post-md)         |
| page        | `{name}.page.md`        | [link](https://gist.github.com/briangonzalez/2ece66bfffff31ddc230ca8342e80b3e#file-about-page-md)                   |
| navigation  | `links.txt`             | [link](https://gist.github.com/briangonzalez/2ece66bfffff31ddc230ca8342e80b3e#file-links-txt)                       |
| image       | clone gist and upload   | [link](https://gist.github.com/briangonzalez/2ece66bfffff31ddc230ca8342e80b3e#file-your-speed-jpg)                  |
| draft       | `{name}.post.draft.md`  |                                                                                                                     |

Here is the [gist](https://gist.github.com/briangonzalez/2ece66bfffff31ddc230ca8342e80b3e)
that powers [this blog](https://www.briangonzalez.org).

## Getting started

Step 1, create your gist and add some content.

Step 2, create `gustavo.config.js` with the following:

```js
module.exports = {
  title: 'My gustavo blog',
  githubToken: '<< token >>',
  gistId: '<< gist id >>'
}
```

_Note: you'll want to create a [personal access token](https://github.com/settings/tokens) on Github because Gustavo uses the Gist API, and without the token, your blog will be rate limited._

Step 3, create a `Dockerfile` with the following:

```docker
FROM eggplanet/gustavo:latest
```

Step 4, let's start it up.

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
now alias my-gustavo-blog-wjdihnxorf.now.sh my-gustavo.blog
```

### License

- MIT

### Credits

- [Logo](https://thenounproject.com/search/?q=man&i=542085)

### Releasing a new image

```
docker build -t eggplanet/gustavo .
docker push eggplanet/gustavo
```
