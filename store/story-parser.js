import showdown from 'showdown'
const converter = new showdown.Converter()
const cheerio = require('cheerio')

export default {
  parseStory (raw) {
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
  },

  parseStories (files) {
    return files
    .filter(file => file.filename.includes('.story'))
    .map(raw => {
      // console.log(raw)
      // console.log(this.parseStory(raw))
      return this.parseStory(raw)
    })
    .sort((current, other) => new Date(other.meta.date) - new Date(current.meta.date))
  }

}
