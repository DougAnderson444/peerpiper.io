// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_faqs.js` rather than `faqs.js`, because
// we don't want to create an `/faq/faqs` route — the leading
// underscore tells Sapper not to do that.

const faqs = [
  {
    title: 'What is PeerPiper.io?',
    slug: 'what-is-peerpiper',
    html: `
			<p>First, PeerPiper enables you to make a nice, human readable decentralized ID like: <p><pre><b>doug.peerpiper.io</b></pre></p>
			instead of the usual ugly decentalized ID like:</p><p><pre>did:piper:b6804f58f64eb6f59061806f4d916c8a96334d83a9102844d195218d589b78fa</pre></p>

			<p>Next, PeerPiper enables you to use this decentalized ID on the web, or on your computer at home.
			 Normally this Web3 technology is only available as a download, but PeerPiper allows users to also use the web, which we think is more convenient to start.</p>

			<ul>
				<li>Human readable identity: doug.peerpiper.io</li>
				<li>Web-based or download the home app.</li>
				<li>Find connections outside your peer group, and all the search bells and whistles</li>
				<li>100% private - the data is located and controlled in your browser (or downloaded app)</li>
			</ul>

			<p>It's implemented using the Hypercore Protocol and IPFS behind the scenes. Which means it'll be available, even if this website is not.</p>
		`
  },

  {
    title: 'How do I use PeerPiper.io',
    slug: 'how-to-use-peerpiper',
    html: `
			<h2>Step one</h2>
			<p>Find someone who has an account already, and ask to get invited. You can post of Twitter to ask for an account too.</p>

			<h2>Step two</h2>
			<p>Save some data to your profile. It can be anything, from your contact info to your favorite color.</p>

			<h2>Step three</h2>
			<p>Share your decentalized ID with contacts that you want to exchange data. This can be either your <pre>doug.peerpiper.io</pre> ID or the full ugly <pre>did:piper:b6804f58f64eb6f59061806f4d916c8a96334d83a9102844d195218d589b78fa</pre> </p>

			<h2>Step four</h2>
			<p>When you need the latest details from a contact, look them up and the latest will be next to their name!</p>
		`
  },

  {
    title: 'Why the name?',
    slug: 'why-the-name',
    html: `
			<p>In the coming decentralized web, the technology if known as "Peer to Peer" (or P2P for short). Since there is a data pipeline between peers — the name was born <em>peerpiper</em>.</p>

			<p>For TV show aficionados, the name bears resemblance to "Pied Piper" of the famed TV Show "Silicon Valley" who were also decentralizing the internet near the end of the show, but the alliteration and similar word piper is mere coincidence.</p>
		`
  },

  {
    title: 'How is peerpiper different from regular websites?',
    slug: 'how-is-peerpiper-different-from-regular-web',
    html: `
			<p><a href='https://en.wikipedia.org/wiki/Web_2.0' target='_blank'><b>Web 2.0</b></a> was all about gathering all of your data in big central servers.</p> <p><b>Web 3.0</b> however, is about <b>"<i>connecting</i> the data"</b> instead of <b>"<i>collecting</i> the data"</b>. To that end, differences are:</p>

			<ul>
				<li>Your data is stored in the browser, instead of the server</li>
				<li>Your secrets (such as passwords, secret keys) are never given to the server</li>
				<li>The data talks directly to other peers (peer-to-peer) so if the PeerPiper website goes down or disappears, your data will still be connected to your contacts!</li>
				<li>The code underlying PeerPiper works both in the browser and on your computer at home. You can use them interchangeably, without any server</li>
			</ul>
		`
  },

  {
    title: 'How can I get involved?',
    slug: 'how-can-i-get-involved',
    html: `
			<p>We're so glad you asked! Come on over to the <a href='https://github.com/DougAnderson444/' target='_blank' rel='noopener noreferrer'>Doug's Github repo</a> and join in the discussion. Everyone is welcome, especially you!</p>
		`
  }
]

faqs.forEach(faq => {
  faq.html = faq.html.replace(/^\t{3}/gm, '')
})

export default faqs
