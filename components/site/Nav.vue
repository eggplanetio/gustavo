<template>
  <nav>
    <a @click="toggle" class="toggle" v-if="hidden">=</a>
    <a @click="toggle" class="toggle" v-else> </a>

    <ul v-if="!hidden">
      <li v-for="link in links">
        <nav-link :link="link"/>
      </li>
    </ul>

    <div class="behind" v-if="!hidden" @click="toggle">
    </div>

  </nav>
</template>

<script>
import axios from 'axios'
import { getters } from '~/store'
import NavLink from '~/components/site/NavLink'
import uniqBy from 'lodash.uniqby'

export default {
  props: [ 'hidden' ],

  mounted () {
    axios.get(`${getters.contentUrl()}/links`)
      .then(response => {
        const { data: { links } } = response

        // http://stackoverflow.com/questions/9268407/how-to-convert-markdown-style-links-using-regex
        const linkRe = /\[([^\]]+)\]\(([^)"]+)(?: "([^"]+)")?\)/
        const createdLinks = links.content
          .split('\n')
          .filter(link => link)
          .map(link => link.match(linkRe))
          .map(link => {
            return { href: link[2], text: link[1] }
          })

        const uniqLinks = uniqBy(createdLinks, link => link.href)
        this.links = uniqLinks.length > 1 ? uniqLinks : [{
          text: 'Create links.md in your gist'
        }]
      })
  },

  data: function () {
    return {
      links: []
    }
  },

  methods: {
    toggle () {
      this.$store.commit('TOGGLE_NAV')
    }
  },
  components: { NavLink }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/_settings.scss";

nav {
  position: fixed;
  top: $size-unit;
  right: $size-unit;
  user-select: none;
  z-index: 2;
  text-align: right;
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
