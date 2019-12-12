import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Rimp from 'rimp'

import Users from './api/users'

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
        Mecentralizing the internet. 
      </p>
      <p>
        Get notified when it's ready for release:
        <br></br>
      <Rimp
        buttonValue={`submit`}
        buttonStyles={`btn`}
        containerStyles={`newsletter__form`}
        completeMessage={`Thanks, we'll send you an email to confirm!`}
        mailChimpUrl="//url.us10.list-manage.com/subscribe/post?u=user&amp;id=list"
      />
      </p>
      <div className="row">
        <a href="create" className="card">
          <h3>Create Portfolio &rarr;</h3>
          <p>Free forever, No signup required.</p>
        </a>
        <a href="learn" className="card">
          <h3>Where your Peers At &rarr;</h3>
          <p>Connect, coordinate, collaborate</p>
        </a>
        <a href="examples" className="card">
          <h3>Examples &rarr;</h3>
          <p>See what you can do with your Peerfolio</p>
        </a>
      </div>
    </div>
    <div>
      <h2 className="description">Leaderboard</h2>
      <p className="description">
        See the peers and the top organizations connected to you. 
      </p>

    </div>

    <style jsx>{`
      .hero {
        margin: 3rem 1rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #525252;
        width: 100%;
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
