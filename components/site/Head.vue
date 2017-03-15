<template>
  <span v-if="false">
  </span>
</template>

<script>
export default {
  data () {
    return {
      href: 'https://twitter.com/intent/tweet?url=' + encodeURIComponent('https://head-elements.now.sh/about')
    }
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: 'site' },
      { name: 'twitter:title', content: 'title' },
      { name: 'twitter:description', content: 'description' },
      { name: 'twitter:image', content: 'image' },
      { name: 'twitter:image:alt', content: 'alt' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: "https://fonts.googleapis.com/css?family=Inconsolata", rel: 'stylesheet' }
    ]
  }
}
</script>
