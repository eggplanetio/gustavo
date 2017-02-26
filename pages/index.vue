
<template lang="html">
  <ul class="story-items">
    <template v-for="story in storiesParsed">
      <story-item :story="story"/>
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
    ...mapGetters([ 'storiesParsed' ])
  }
}
</script>

<style lang="scss" scoped>
.story-items {
  padding: 0;
}
</style>
