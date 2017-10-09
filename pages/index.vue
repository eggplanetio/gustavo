
<template lang="html">
  <ul class="post-items">
    <template v-for="post in posts">
      <post-item :post="post"/>
    </template>
  </ul>
</template>

<script>
import PostItem from '@/components/posts/Item.vue'
import { mapState } from 'vuex'

export default {
  components: { PostItem },

  async fetch ({ store, params }) {
    await store.dispatch('FETCH_POSTS')
  },

  computed: {
    ...mapState([ 'posts' ])
  }
}
</script>

<style lang="scss" scoped>
.post-items {
  padding: 0;
}
</style>
