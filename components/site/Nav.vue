<template>
  <nav>
    <a @click="toggle" class="toggle" v-if="hidden">=</a>
    <a @click="toggle" class="toggle" v-else> </a>

    <ul v-if="!hidden">
      <li v-for="link in links">
        <header-link :link="link"/>
      </li>
    </ul>

    <div class="behind" v-if="!hidden" @click="toggle">
    </div>

  </nav>
</template>

<script>
import store from '~store'
import { mapState } from 'vuex'
import HeaderLink from '~/components/site/HeaderLink'

export default {
  props: [ 'hidden' ],
  methods: {
    toggle () {
      store.commit('TOGGLE_NAV')
    }
  },
  components: { HeaderLink },
  computed: {
    ...mapState([ 'links' ])
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/_settings.scss";

nav {
  position: fixed;
  top: $size-unit;
  right: $size-unit;
  text-align: right;
  user-select: none;
}

a {
  cursor: pointer;
  position: relative;
  z-index: 11;
  font-size: 150%;

  &.toggle {
    margin-right: $size-unit/3;
  }
}

ul {
  background: $color-background;
  border: 1px solid $color-font;
  list-style-type: none;
  padding: $size-unit;
  padding-left: $size-unit * 3;
  background: $color-background;
  position: relative;
  z-index: 10;
  transform: translateY($size-unit* -1.25);

  li {
    margin-bottom: $size-unit/4;

    &:last-child {
      margin-bottom: 0;
    }
  }

}

.behind {
  position: fixed;
  top: 0; right: 0; left: 0; bottom: 0;
  z-index: 5;
}

</style>
