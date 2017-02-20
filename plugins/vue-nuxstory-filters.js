import Vue from 'vue'
import showdown from 'showdown'
const converter = new showdown.Converter()

const plugin = {
  install (Vue, options) {
    Vue.filter('markdown', (content) => converter.makeHtml(content))
  }
}

Vue.use(plugin)
