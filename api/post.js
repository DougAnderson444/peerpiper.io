const fetch = require('node-fetch') // to make fetch work in nodejs

module.exports = async (req, res) => {
  try {
    const response = await fetch(process.env.SUPERPEER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`
      },
      body: JSON.stringify(req.body) // body data type must match "Content-Type" header
    })

    const r = await response.json() // parses JSON response into native JavaScript objects
    res.status(200).json(r)
  } catch (error) {
    console.error('POST Error is: ', error)
    res.status(504).json({ error: 'No server' })
  }
}
