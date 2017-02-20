
<template lang="html">
  <ul>
    <template v-for="story in stories">
      <story-item :story="story">
    </template>
  </ul>
</template>

<script>
import axios from 'axios';
import StoryItem from '~components/stories/Item.vue';
import { mapGetters } from 'vuex'
let host;

export default {
  components: { StoryItem },

  data(context) {
    host = context.req && context.req.headers.host;
    return { host };
  },

  async fetch ({ store, params }) {
    store.commit('setHost', host);

    let { data } = await axios.get(store.getters.contentUrl);
    const files = Object.values(data.files);
    store.commit('setFiles', files);
  },

  computed: {
    ...mapGetters([ 'stories' ])
  }
}
</script>
