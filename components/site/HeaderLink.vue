<template lang="html">
  <span>
    <nuxt-link v-if="isLocal" :to="link.href">
      {{ link.text }}
    </nuxt-link>

    <a :href="link.href" v-else>
      {{ link.text }}
    </a>

  </span>
</template>

<script>
export default {
  props: ['link'],

  computed: {
    isLocal () {
      const href = this.link.href || ''
      return href.startsWith('/')
    }
  }

}
</script>

<style lang="scss">
a {
  text-decoration: none;
}
</style>
