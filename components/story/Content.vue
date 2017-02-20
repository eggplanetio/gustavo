<template lang="html">
  <div v-html="this.$options.filters.markdown(content)">
  </div>
</template>

<script>
export default {
  props: [ 'content' ],
}
</script>
