
<template lang="html">
  <div class="">
    <story-content :story="currentStory" />
  </div>
</template>

<script>
import axios from 'axios';
import StoryContent from '~components/story/Content.vue';
import { mapState } from 'vuex'
let host;

export default {
  components: { StoryContent },

  data(context) {
    host = context.req && context.req.headers.host;
    return { host };
  },

  async fetch ({ store, params, redirect }) {
    store.commit('setHost', host);

    store.commit('setCurrentStoryFromID', params.id)
    let currentStory = store.state.currentStory
    if (currentStory) return currentStory;

    let { data } = await axios.get(store.getters.contentUrl);
    const files = Object.values(data.files);
    store.commit('setLinksFromFiles', files)
    store.commit('setCurrentStoryFromFilesAndID', { files, id: params.id })
    currentStory = store.state.currentStory

    if (!currentStory) return redirect('/')
    return currentStory;
  },

  computed: {
    ...mapState([ 'currentStory' ])
  }
}
</script>
