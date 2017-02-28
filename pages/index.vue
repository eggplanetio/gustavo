
<template lang="html">
  <ul class="post-items">
    <template v-for="post in posts">
      <post-item :post="post"/>
    </template>
  </ul>
</template>

<script>
import axios from 'axios';
import PostItem from '~components/posts/Item.vue';
import { mapState } from 'vuex'
let host;

export default {
  components: { PostItem },

  data(context) {
    host = context.req && context.req.headers.host;
    return { host };
  },

  async fetch ({ store, params }) {
    store.commit('setHost', host)

    let { data } = await axios.get(store.getters.contentUrl)
    const files = Object.values(data.files)
    store.commit('setLinksFromFiles', files)
    store.commit('setPostsFromFiles', files)
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
