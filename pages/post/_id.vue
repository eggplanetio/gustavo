
<template lang="html">
  <div class="">
    <BackHome />
    <Post :post="currentPost" />
  </div>
</template>

<script>
import Post from '@/components/post/Post.vue'
import BackHome from '@/components/site/BackHome.vue'
import { mapState } from 'vuex'

export default {
  components: {
    BackHome,
    Post
  },

  async fetch ({ store, params, redirect }) {
    await store.dispatch('FETCH_POST', params.id)
    const currentPost = store.state.currentPost

    if (!currentPost) return redirect('/')
    return currentPost
  },

  head () {
    return {
      'title': this.currentPost.meta.title,
      'og:title': 'foo',
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.currentPost.meta.title },
        { hid: 'og:description', name: 'og:description', content: this.currentPost.meta.description || this.currentPost.firstSentence },
        { hid: 'twitter:title', name: 'twitter:title', content: this.currentPost.meta.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.currentPost.meta.description || this.currentPost.firstSentence },
        { hid: 'description', name: 'description', content: this.currentPost.meta.description || this.currentPost.firstSentence }
      ]
    }
  },

  computed: {
    ...mapState([ 'currentPost' ])
  }
}
</script>
