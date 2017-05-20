<template lang="html">
  <div>
    <h1>{{ post.meta.title }}</h1>
    <p>
      <author v-if="post.meta.author">{{ post.meta.author }} / </author>
      <time v-if="post.meta.date">{{ post.meta.date | toIsoDate | moment("MMM D YYYY") }}</time>
      </p>
    <div v-html="post.content">
    </div>
  </div>
</template>

<script>
import postContent from '~components/post/Content.vue'
export default {
  components: { postContent },
  props: [
    'post',
  ],
}
</script>
