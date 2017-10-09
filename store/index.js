import axios from 'axios'
import parser from './parser'

export function state () {
  return {
    currentPage: {},
    currentPost: {},
    posts: [],
    links: [],
    host: '',
    navHidden: true
  }
}

export const getters = {
  contentUrl: state => {
    let host
    if (typeof window === 'undefined') {
      host = `http://0.0.0.0:${process.env.runningPort}`
    } else {
      host = `//${window.location.host}`
    }
    return `${host}/api`
  }
}

export const actions = {
  async FETCH_PAGE ({ dispatch, commit }, id) {
    let { data: { page } } = await axios.get(`${getters.contentUrl()}/pages/${id}`)
    commit('SET_CURRENT_PAGE', page)
  },
  async FETCH_POST ({ commit }, id) {
    let { data: { post } } = await axios.get(`${getters.contentUrl()}/posts/${id}`)
    commit('SET_CURRENT_POST', post)
  },
  async FETCH_POSTS ({ commit }) {
    let { data: { posts } } = await axios.get(`${getters.contentUrl()}/posts`)
    commit('SET_POSTS', posts)
  }
}

export const mutations = {
  SET_CURRENT_POST (state, post) {
    state.currentPost = parser.parsePost(post)
  },
  SET_CURRENT_PAGE (state, page) {
    state.currentPage = parser.parsePage(page)
  },
  SET_POSTS (state, posts) {
    state.posts = parser.parsePosts(posts)
  },
  TOGGLE_NAV (state) {
    state.navHidden = !state.navHidden
  },
  HIDE_NAV (state) {
    state.navHidden = true
  }
}
