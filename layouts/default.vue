<template>
  <div>
    <SiteHead/>
    <SiteNav :hidden="navHidden" />
    <main>
      <nuxt/>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SiteHead from '@/components/site/Head.vue'
import SiteNav from '@/components/site/Nav.vue'

export default {
  components: {
    SiteHead,
    SiteNav
  },
  computed: {
    ...mapState([ 'navHidden', 'links' ])
  }
}
</script>

<style>
</style>
