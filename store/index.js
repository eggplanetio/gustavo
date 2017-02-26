import Vue from 'vue'
import Vuex from 'vuex'
import showdown from 'showdown'
const converter = new showdown.Converter()
const cheerio = require('cheerio')

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
    storiesParsed (state) {
      return state.files
        .filter(file => file.filename.includes('.story'))
        .map(raw => {
          const content = converter.makeHtml(raw.content)
          const $ = cheerio.load(content)
          const meta = {}
          $('meta').each((e, el) => {
            meta[el.attribs.name] = el.attribs.content
          })

          const title = $('h1').text()
          const segment = raw.filename.split('.story')[0]
          const path = `/story/${segment}`
          const id = raw.filename.split('.story')[0]

          return {
            id,
            title,
            content,
            path,
            meta
          }
        })
        .sort((current, other) => new Date(other.meta.date) - new Date(current.meta.date))
    },
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
