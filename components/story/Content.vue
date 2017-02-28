<template lang="html">
  <div>
    <h1>
      {{ story.meta.title }}
    </h1>
    <p><date>{{ story.meta.date | moment("MMM D YYYY") }}</date></p>
    <div v-html="story.content">
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'story',
  ],
}
</script>
