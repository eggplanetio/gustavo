
<template lang="html">
  <div class="">
    <div v-for="story in stories">
    <story-content :content="story" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import StoryContent from '~components/story/Content.vue'
let host;

export default {
  components: { StoryContent },

  data(context) {
    host = context.req.headers.host;
    return { host: context.req.headers.host };
  },

  async fetch ({ store, params }) {
    const url = `http://${host}/api/content`;
    let { data } = await axios.get(url);
    const stories = Object.values(data.files).map(file => file.content);
    return { stories };
  },
}
</script>
