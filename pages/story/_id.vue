
<template lang="html">
  <div class="">
    <story-content :content="currentStory.content" />
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

  async fetch ({ store, params }) {
    store.commit('setHost', host);

    let { data } = await axios.get(store.getters.contentUrl);
    const files = Object.values(data.files);
    store.commit('setFiles', files);

    const currentStory = store.state.files
      .find(file => file.filename.split('.story')[0] === params.id);

    store.commit('setCurrentStory', currentStory);
  },

  computed: {
    ...mapState([ 'currentStory' ])
  }
}
</script>
