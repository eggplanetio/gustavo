import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import parser from './parser'
import uniqBy from 'lodash.uniqby'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    currentPage: {},
    currentPost: {},
    posts: [],
    links: [],
    host: ''
  },

  actions: {
    async FETCH_PAGE ({ dispatch, commit }, id) {
      let { data } = await axios.get(store.getters.contentUrl)
      const files = Object.values(data.files)
      commit('SET_LINKS_FROM_FILES', files)
      commit('SET_CURRENT_PAGE_FROM_FILE_AND_ID', { files, id })
    },
    async FETCH_POST ({ commit }, id) {
      commit('SET_CURRENT_POST_FROM_ID', id)
      let currentPost = store.state.currentPost
      if (currentPost) return

      let { data } = await axios.get(store.getters.contentUrl)
      const files = Object.values(data.files)
      commit('SET_LINKS_FROM_FILES', files)
      commit('SET_CURRENT_POST_FROM_FILE_AND_ID', { files, id })
    },
    async FETCH_POSTS ({ commit }) {
      let { data } = await axios.get(store.getters.contentUrl)
      const files = Object.values(data.files)
      commit('SET_LINKS_FROM_FILES', files)
      commit('SET_POSTS_FROM_FILES', files)
    }
  },

  mutations: {
    SET_CURRENT_POST_FROM_ID (state, id) {
      state.currentPost = state.posts.find(s => s.id === id)
    },
    SET_CURRENT_POST_FROM_FILE_AND_ID (state, data) {
      state.currentPost = parser.parsePosts(data.files)
        .find(s => s.id === data.id)
    },
    SET_CURRENT_PAGE_FROM_FILE_AND_ID (state, data) {
      state.currentPage = parser.parsePages(data.files)
        .find(s => s.id === data.id)
    },
    SET_POSTS_FROM_FILES (state, files) {
      state.posts = parser.parsePosts(files)
    },
    SET_LINKS_FROM_FILES (state, files) {
      const linkTxt = (files || []).find(file => file.filename === 'links.txt')

      let links = []
      if (linkTxt) {
        links = links.concat(
          linkTxt.content
          .split('\n')
          .filter(link => link)
          .map(link => link.split(' '))
          .map(link => { return { href: link[1], text: link[0] } })
        )
      }

      const linkMd = (files || []).find(file => file.filename === 'links.md')

      if (linkMd) {
        // http://stackoverflow.com/questions/9268407/how-to-convert-markdown-style-links-using-regex
        const linkRe = /\[([^\]]+)\]\(([^)"]+)(?: "([^"]+)")?\)/
        links = links.concat(
          linkMd.content
          .split('\n')
          .filter(link => link)
          .map(link => link.match(linkRe))
          .map(link => {
            return { href: link[2], text: link[1] }
          })
        )
      }

      state.links = uniqBy(links, link => link.href)
    }
  },

  getters: {
    contentUrl: state => {
      let host
      if (process.SERVER_BUILD) {
        host = `http://0.0.0.0:${process.env.runningPort}`
      } else {
        host = `//${window.location.host}`
      }
      return `${host}/api/content`
    }
  }

})

export default store
