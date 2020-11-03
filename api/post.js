const fetch = require("node-fetch"); // to make fetch work in nodejs
// const fetch = require('@vercel/fetch-retry')(require('node-fetch'))

module.exports = async (req, res) => {

    console.log(` sp: ${process.env.SUPERPEER} `)
    
    const response = await fetch(process.env.SUPERPEER, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TOKEN}`            
          },
        body: JSON.stringify(req.body), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
