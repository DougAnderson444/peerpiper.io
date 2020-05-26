import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'

const Iota = require('@iota/core');

// Create a new instance of the IOTA API object
// Use the `provider` field to specify which node to connect to
const iota = Iota.composeAPI({
  provider: 'https://nodes.devnet.iota.org:443'
  });

async function constShowInfo() {

  // Call the `getNodeInfo()` method for information about the node and the Tangle
  try {  
    const nodeInfo = await iota.getNodeInfo()
    const constShowInfo = JSON.stringify(await nodeInfo, null, 1)
    return constShowInfo
  }catch (e) {
    return e;
  }
    
}
const info = constShowInfo()


const Home = () => (
  <div>
    <Head>
      <link rel="icon" href="favicon.ico" />
      <title>PeerPiper.io</title>
    </Head>

    <Nav />

    <div className="hero">
      <center>
        <img width="150" height="150" layout="fixed" className="logo" src="P.png"></img>
      </center>
      <h1 className="title">PeerPiper.io</h1>
      <p className="description">
      Your ultimate personal data sink. Save once, pipe out to your selected peer groups. 
      </p>
      <div className="row">
        <div className="col">
          <a href="https://mailchi.mp/fa2bf49dfc8b/peerpiper" target="_blank" className="card">
            <h3>PeerPiper Portfolio &rarr;</h3>
            <p>Verify all your resume experience, skills, personality, anything really.</p>
          </a>
        </div>
        <div className="col">
          <a href="https://mailchi.mp/fa2bf49dfc8b/peerpiper" target="_blank" className="card">
            <h3>PeerPiper Pad &rarr;</h3>
            <p>Stream out your address, never miss mail again.</p>
          </a>
        </div>
        <div className="col">
          <a href="https://mailchi.mp/fa2bf49dfc8b/peerpiper" target="_blank" className="card">
            <h3>PeerPiper Pulse &rarr;</h3>
            <p>Stream out your availability, never miss a meeting again.</p>
          </a>
        </div>
      </div>
    </div>
    <div>
      <center>

      <h2>Try it out:</h2>
      <p className="description">
      Coming soon... {info}
      </p>
      </center>
    </div>

    <style jsx>{`
      .hero {
        margin: 3rem 1rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #525252;
        width: 100%;
      }
      h2 {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 20px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

      }
      .col {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #32ba46;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #32ba46;
      }
      .card h3 {
        margin: 0;
        color: #32ba46;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)

export default Home
