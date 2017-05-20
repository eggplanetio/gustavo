import showdown from 'showdown'
const converter = new showdown.Converter({
  tables: true
})

let Parser
if (process.SERVER_BUILD) {
  Parser = require('xmldom').DOMParser
} else {
  Parser = DOMParser
}

const makeDOM = (html) => {
  return new Parser().parseFromString(html, 'text/html')
}

export default {
  parseItem(raw, split) {
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
    content = content.replace(/<pre>/g, '<pre v-highlightjs="sourcecode">')

    return {
      id,
      content,
      path,
      meta
    }
  },

  parsePosts(files) {
    return files
      .filter(file => file.filename.includes('.post.md'))
      .map(raw => this.parseItem(raw, '.post'))
      .sort((current, other) => new Date(other.meta.date) - new Date(current.meta.date))
  },

  parsePages(files) {
    return files
      .filter(file => file.filename.includes('.page.md'))
      .map(raw => this.parseItem(raw, '.page'))
  }

}
