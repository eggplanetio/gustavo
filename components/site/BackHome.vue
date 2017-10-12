<template lang="html">
  <a href='/' class='back-home'>
    ←
  </a>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~assets/css/_settings.scss";

.back-home {
  text-decoration: none;
  border-bottom: none;
  position: absolute;
  top: $size-unit;
  left: $size-unit;
  background: none;
}
</style>
