<template lang="html">
  <li class="">
    <div v-html="this.$options.filters.markdown(story.content)">
    </div>

    <nuxt-link :to="to">
      Read
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: ['story'],
  computed: {
    to () {
      const segment = this.story.filename.split('.story')[0];
      return `/story/${segment}`;
    }
  }
}
</script>

<style lang="css">
</style>
