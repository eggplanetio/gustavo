<template>
  <div>
    <site-head/>
    <site-nav :hidden="navHidden" />
    <main>
      <nuxt/>
    </main>
    <site-footer/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SiteHead from '~components/site/Head.vue'
import SiteNav from '~components/site/Nav.vue'
import SiteFooter from '~components/site/Footer.vue'

export default {
  components: {
    SiteHead,
    SiteNav,
    SiteFooter
  },
  computed: {
    ...mapState([ 'navHidden', 'links' ])
  }
}
</script>

<style>
</style>
