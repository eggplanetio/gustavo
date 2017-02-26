<template lang="html">
  <li class="story-item">
    <nuxt-link :to="to">
      {{ story.title }}

      <date>
        {{ story.meta.date | moment("MMM D YYYY") }}
      </date>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: ['story'],
  computed: {
    to () {
      return this.story.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/_settings.scss";

.story-item {
  margin-bottom: $size-unit;
  list-style-type: none;
  padding: 0;

  a { text-decoration: none; }
}
</style>

<style lang="scss">
.story-item p {
  display: none;
}
</style>
