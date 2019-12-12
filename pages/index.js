import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'


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
      Smart hiring solution for the 21st Century 
      </p>
      <div className="row">
      <a href="https://mailchi.mp/fa2bf49dfc8b/peerpiper" target="_blank" className="card">
          <h3>Get Notified &rarr;</h3>
          <p>Be a first mover (opens a new window for you).</p>
        </a>
        </div>
    </div>
    <div>
      <center>

      <h2>Coming soon:</h2>
      <p className="description">
      Smart hiring solution for the 21st Century 
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
