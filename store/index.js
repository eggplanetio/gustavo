import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import parser from './parser'
Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    currentPage: {},
    currentStory: {},
    stories: [],
    links: [],
    host: ''
  },

  mutations: {
    setCurrentStoryFromID (state, id) {
      state.currentStory = state.stories.find(s => s.id === id)
    },
    setCurrentStoryFromFilesAndID (state, data) {
      state.currentStory = parser.parseStories(data.files)
        .find(s => s.id === data.id)
    },
    setCurrentPageFromFilesAndID (state, data) {
      state.currentPage = parser.parsePages(data.files)
        .find(s => s.id === data.id)
    },
    setStoriesFromFiles (state, files) {
      state.stories = parser.parseStories(files)
    },
    setHost (state, host) {
      if (host) state.host = host
    },
    setLinksFromFiles (state, files) {
      const linkFile = (files || []).find(file => file.filename === 'links.txt')

      if (linkFile) {
        state.links = linkFile
        .content
        .split('\n')
        .filter(link => link)
        .map(link => link.split(' '))
        .map(link => { return { href: link[1], text: link[0] } })
      }
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
    contentUrl: state => `http://${state.host}/api/content`
  }

})

export default store
