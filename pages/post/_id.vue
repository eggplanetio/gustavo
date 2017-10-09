
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
      title: this.currentPost.meta.title
    }
  },

  computed: {
    ...mapState([ 'currentPost' ])
  }
}
</script>
