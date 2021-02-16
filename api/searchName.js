const fetch = require('node-fetch') // to make fetch work in nodejs

module.exports = async (req, res) => {
  console.log('get searching...', req.query.search)
  try {
    const response = await fetch(`${process.env.HYPERBEE_SUPERPEER}${req.query.search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SEARCH_TOKEN}`
      }
    })

    const r = await response.json() // parses JSON response into native JavaScript objects
    res.status(200).json(r)
  } catch (error) {
    console.error(error)
    res.status(504).json({ error: 'No server' })
  }
}
