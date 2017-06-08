
<template lang="html">
  <div>
    <div v-html="currentPage.content">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
