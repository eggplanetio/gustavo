<template lang="html">
  <li class="post-item">
    <nuxt-link :to="to">
      {{ post.meta.title }}
      <date>
        {{ post.meta.date | moment("MMM D YYYY") }}
      </date>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: ['post'],
  computed: {
    to () {
      return this.post.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/_settings.scss";

.post-item {
  margin-bottom: $size-unit;
  list-style-type: none;
  padding: 0;

  a { text-decoration: none; }
}
</style>

<style lang="scss">
.post-item p {
  display: none;
}
</style>
