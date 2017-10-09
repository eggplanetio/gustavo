<template lang="html">
  <li class="post-item">
    <nuxt-link :to="to">
      {{ post.meta.title }}
      <time>
        {{ post.meta.date | toIsoDate | moment("MMM D YYYY") }}
      </time>
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
@import "../../assets/css/_settings.scss";

.post-item {
  margin-bottom: $size-unit*1.5;
  list-style-type: none;
  padding: 0;

  a {
    text-decoration: none;
    border: none;
  }

  time {
    margin-top: $size-unit/2;
    display: block;
  }
}
</style>
