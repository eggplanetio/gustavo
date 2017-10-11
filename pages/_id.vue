
<template lang="html">
  <div>
    <BackHome />
    <div v-html="currentPage.content">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BackHome from '@/components/site/BackHome.vue'

export default {
  components: {
    BackHome
  },

  async fetch ({ store, params }) {
    await store.dispatch('FETCH_PAGE', params.id)
  },

  head () {
    return {
      title: this.currentPage.meta.title
    }
  },

  computed: {
    ...mapState([ 'currentPage' ])
  }
}
</script>
