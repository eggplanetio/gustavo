import Vue from 'vue'
Vue.use({
  install () {
    Vue.filter('toIsoDate', dateString => new Date(dateString))
  }
})
