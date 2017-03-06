<template>
  <nav>
    <a @click="toggle" v-if="hidden">=</a>
    <a @click="toggle" v-else>×</a>

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
import { mapState } from 'vuex'
import HeaderLink from '~/components/site/HeaderLink';

export default {
  data() {
    return {
      hidden: true
    }
  },
  methods: {
    toggle() {
      this.hidden = !this.hidden
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
  position: absolute;
  top: $size-unit;
  right: $size-unit;
  text-align: right;
  background: white;
  z-index: 10;
}

a {
  cursor: pointer;
  position: relative;
  z-index: 10;
}

ul {
  border: 1px solid black;
  list-style-type: none;
  padding: $size-unit;
  padding-left: $size-unit * 3;
  background: white;
  position: relative;
  z-index: 10;

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

