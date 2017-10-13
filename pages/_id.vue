
<template lang="html">
  <div>
    <BackHome />
    <div v-html="currentPage.content">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BackHome from '@/components/site/BackHome.vue'
import * as hljs from 'highlight.js'

export default {
  components: {
    BackHome
  },

  async fetch ({ store, params }) {
    await store.dispatch('FETCH_PAGE', params.id)
  },

  head () {
    return {
      title: this.currentPage.meta.title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.currentPage.meta.title },
        { hid: 'og:description', name: 'og:description', content: this.currentPage.meta.description || this.currentPage.firstSentence },
        { hid: 'twitter:title', name: 'twitter:title', content: this.currentPage.meta.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.currentPage.meta.description || this.currentPage.firstSentence },
        { hid: 'description', name: 'description', content: this.currentPage.meta.description || this.currentPage.firstSentence }
      ]
    }
  },

  mounted () {
    const pres = [...document.querySelectorAll('pre')];
    if (typeof hljs === 'object') {
      pres.forEach(el => {
        hljs.highlightBlock(el)
      })
    }
  },

  computed: {
    ...mapState([ 'currentPage' ])
  }
}
</script>
