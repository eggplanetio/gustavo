import showdown from 'showdown'
const converter = new showdown.Converter()
const cheerio = require('cheerio')

export default {
  parseItem (raw, split) {
    const content = converter.makeHtml(raw.content)
    const $ = cheerio.load(content)
    const meta = {}
    $('meta').each((e, el) => {
      meta[el.attribs.name] = el.attribs.content
    })

    const title = $('h1').text()
    const segment = raw.filename.split(split)[0]
    const path = `/post/${segment}`
    const id = raw.filename.split(split)[0]

    return {
      id,
      title,
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
