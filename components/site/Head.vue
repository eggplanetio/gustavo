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
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: 'site' },
      { name: 'twitter:title', content: 'title' },
      { name: 'twitter:description', content: 'description' },
      { name: 'twitter:image', content: 'image' },
      { name: 'twitter:image:alt', content: 'alt' }
    ],
    link: [
      { href: "https://fonts.googleapis.com/css?family=Inconsolata", rel: 'stylesheet' }
    ]
  }
}
</script>
