const Parser = require('rss-parser')
const parser = new Parser()
const rssUrl = 'https://medium.com/feed/peerpiper'

module.exports = async (req, res) => {
  try {
    const feed = await parser.parseURL(rssUrl)
    res.status(200).json(feed)
  } catch (error) {
    console.error(error)
    res.status(504).json({ error: 'No server' })
  }
}
