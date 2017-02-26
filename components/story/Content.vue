<template lang="html">
  <div>
    <div v-html="story.content">
    </div>
    <date>{{ story.meta.date | moment("MMM D YYYY") }}</date>
  </div>
</template>

<script>
export default {
  props: [
    'story',
  ],
}
</script>
