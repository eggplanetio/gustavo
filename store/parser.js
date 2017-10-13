import showdown from 'showdown'
const converter = new showdown.Converter({
  tables: true
})

let Parser
if (typeof DOMParser === 'undefined') {
  Parser = require('xmldom').DOMParser
} else {
  Parser = DOMParser
}

const makeDOM = (html) => {
  return new Parser().parseFromString(html, 'text/html')
}

export default {
  parseItem (raw, split) {
    let content = converter.makeHtml(raw.content)
    const doc = makeDOM(content)

    const meta = {}
    const metaNodes = Array.from(doc.getElementsByTagName('meta'))
    metaNodes.forEach(node => {
      meta[node.getAttribute('name')] = node.getAttribute('content')
    })

    const segment = raw.filename.split(split)[0]
    const path = `/post/${segment}`
    const id = raw.filename.split(split)[0]
    content = content.replace(/<pre>/g, '<pre v-highlightjs>')

    const firstSentence = content.slice(3)
      .split('.')[0] + '.'

    return {
      id,
      content,
      path,
      meta,
      firstSentence
    }
  },

  parsePost (rawHtml) {
    return this.parseItem(rawHtml, '.post.md')
  },

  parsePage (rawHtml) {
    return this.parseItem(rawHtml, '.page.md')
  },

  parsePosts (files) {
    return files
      .filter(file => file.filename.includes('.post.md'))
      .map(raw => this.parseItem(raw, '.post'))
      .sort((current, other) => new Date(other.meta.date) - new Date(current.meta.date))
  }
}
