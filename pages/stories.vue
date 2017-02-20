
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

export default {
  components: { StoryItem },

  async fetch ({ store, params }) {
    const url = '/api/content';
    let { data } = await axios.get(url);
    const files = Object.values(data.files);
    store.commit('setFiles', files);
  },

  computed: {
    ...mapGetters([ 'stories' ])
  }
}
</script>
