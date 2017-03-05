import showdown from 'showdown'
import { DOMParser } from 'xmldom'
const converter = new showdown.Converter()

const getDocument = (html) => {
  if (process.BROWSER_BUILD) {
    const div = document.createElement('div')
    div.innerHTML = html
    return div
  } else {
    return new DOMParser().parseFromString(html)
  }
}

export default {
  parseItem (raw, split) {
    let content = converter.makeHtml(raw.content)
    const doc = getDocument(content)

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

  parsePosts (files) {
    return files
    .filter(file => file.filename.includes('.post.md'))
    .map(raw => this.parseItem(raw, '.post'))
    .sort((current, other) => new Date(other.meta.date) - new Date(current.meta.date))
  },

  parsePages (files) {
    return files
    .filter(file => file.filename.includes('.page.md'))
    .map(raw => this.parseItem(raw, '.page'))
  }

}
