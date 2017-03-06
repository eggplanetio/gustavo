<template>
  <div>
    <site-head/>
    <site-nav/>
    <main>
      <nuxt/>
    </main>
    <site-footer/>
  </div>
</template>

<script>
import SiteHead from '~components/site/Head.vue'
import SiteNav from '~components/site/Nav.vue'
import SiteFooter from '~components/site/Footer.vue'

export default {
  components: {
    SiteHead,
    SiteNav,
    SiteFooter
  },

}
</script>

<style>
</style>
