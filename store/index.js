import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    currentStory: '',
    files: [],
    host: ''
  },

  mutations: {
    setCurrentStory (state, story) {
      state.currentStory = story
    },
    setFiles (state, files) {
      state.files = files
    },
    setHost (state, host) {
      if (host) state.host = host
    }
  },

  actions: {
    async fetchFiles ({ commit }, url) {
      let { data } = await axios.get(url)
      const files = Object.values(data.files)
      commit('setFiles', files)
    }
  },

  getters: {
    contentUrl: state => `http://${state.host}/api/content`,
    stories: state => state.files.filter(file => file.filename.includes('.story')),
    links (state) {
      const linkFile = state.files.find(file => file.filename === 'links.txt')

      if (linkFile) {
        return linkFile
        .content
        .split('\n')
        .filter(link => link)
        .map(link => link.split(' '))
        .map(link => { return { href: link[1], text: link[0] } })
      }
    }
  }

})

export default store
