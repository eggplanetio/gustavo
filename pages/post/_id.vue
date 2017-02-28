
<template lang="html">
  <div class="">
    <post-content :post="currentPost" />
  </div>
</template>

<script>
import axios from 'axios';
import postContent from '~components/post/Content.vue';
import { mapState } from 'vuex'
let host;

export default {
  components: { postContent },

  data(context) {
    host = context.req && context.req.headers.host;
    return { host };
  },

  async fetch ({ store, params, redirect }) {
    store.commit('setHost', host);

    store.commit('setcurrentPostFromID', params.id)
    let currentPost = store.state.currentPost
    if (currentPost) return currentPost;

    let { data } = await axios.get(store.getters.contentUrl);
    const files = Object.values(data.files);
    store.commit('setLinksFromFiles', files)
    store.commit('setcurrentPostFromFilesAndID', { files, id: params.id })
    currentPost = store.state.currentPost

    if (!currentPost) return redirect('/')
    return currentPost;
  },

  computed: {
    ...mapState([ 'currentPost' ])
  }
}
</script>
