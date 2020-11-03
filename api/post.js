const fetch = require("node-fetch"); // to make fetch work in nodejs
// const fetch = require('@vercel/fetch-retry')(require('node-fetch')) // vercel's version of same

module.exports = async (req, res) => {

    const response = await fetch(process.env.SUPERPEER, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TOKEN}`
          },
        body: JSON.stringify(req.body), // body data type must match "Content-Type" header
    });
    
    const r = await response.json() // parses JSON response into native JavaScript objects
    console.log(` response.json: `, r)
    res.status(200).json(r) 
}
