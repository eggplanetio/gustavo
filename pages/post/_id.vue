
<template lang="html">
  <div class="">
    <post :post="currentPost" />
  </div>
</template>

<script>
import post from '~components/post/Post.vue'
import { mapState } from 'vuex'

export default {
  components: { post },

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
