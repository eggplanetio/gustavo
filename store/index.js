import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import parser from './parser'
Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    currentPage: {},
    currentPost: {},
    posts: [],
    links: [],
    host: ''
  },

  mutations: {
    setcurrentPostFromID (state, id) {
      state.currentPost = state.posts.find(s => s.id === id)
    },
    setcurrentPostFromFilesAndID (state, data) {
      state.currentPost = parser.parsePosts(data.files)
        .find(s => s.id === data.id)
    },
    setCurrentPageFromFilesAndID (state, data) {
      state.currentPage = parser.parsePages(data.files)
        .find(s => s.id === data.id)
    },
    setPostsFromFiles (state, files) {
      state.posts = parser.parsePosts(files)
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
