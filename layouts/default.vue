<template>
  <div>
    <site-head/>
    <site-header/>
    <main>
      <nuxt/>
    </main>
    <site-footer/>
  </div>
</template>

<script>
import SiteHead from '~components/site/Head.vue'
import SiteHeader from '~components/site/Header.vue'
import SiteFooter from '~components/site/Footer.vue'

export default {
  components: {
    SiteHead,
    SiteHeader,
    SiteFooter
  },

}
</script>

<style>
</style>
