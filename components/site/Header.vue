<template>
  <header>
    <h1>
      <nuxt-link to='/'>△</nuxt-link>
    </h1>

    <ul>
      <li v-for="link in links">
        <header-link :link="link"/>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import HeaderLink from '~/components/site/HeaderLink'

export default {
  components: { HeaderLink },
  computed: {
    ...mapState([ 'links' ])
  }
}
</script>
