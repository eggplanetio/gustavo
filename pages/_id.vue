
<template lang="html">
  <div>
    <h1>
      {{ currentPage.meta.title }}
    </h1>
    <div v-html="currentPage.content">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
let host;

export default {
  data(context) {
    host = context.req && context.req.headers.host;
    return { host };
  },

  async fetch ({ store, params }) {
    store.commit('setHost', host)
    let { data } = await axios.get(store.getters.contentUrl)
    const files = Object.values(data.files)
    store.commit('setLinksFromFiles', files)
    store.commit('setCurrentPageFromFilesAndID', { files, id: params.id })
  },

  computed: {
    ...mapState([ 'currentPage' ])
  }
}
</script>
