# Archived

This original version of PeerPiper is archived as the technology it used is now obsolete.

# PeerPiper.io

<p align="center">
<img src="https://raw.githubusercontent.com/DougAnderson444/peerpiper.io/master/static/apple-icon-114x114.png">
<br/>
<b>PeerPiper.io - Instantly update your connections using HyPNS.</b>
<br/>
</p>

## HyPNS & IPFS Convenience

A [Sapper](https://github.com/sveltejs/sapper)-based, [Vercel](https://vercel.com/)-deployed project running [HyPNS](https://github.com/DougAnderson444/HyPNS) via [HyPNS-Svelte-Component](https://github.com/DougAnderson444/HyPNS-Svelte-Component) and [IPFS Core](https://www.npmjs.com/package/ipfs-core).

## Dev Notes

This project uses Svelte as a front-end with Sapper  framework,  

This project uses vercel functions, for the vercel now functon to work, run
```bash
vercel:dev
```

For production, it's deployed to Vercel now.

### Package.json

Dependencies are located in devDepencies so when this project is pushed to Vercel the size is kept small as devDependencies aren't included in the limited bundle size of Now.

## Getting started

TODO: There will be a way to register on peerpiper to use it as a convenience wrapper for HyPNS

## Bugs and feedback

PeerPiper is in early development, and may have the odd rough edge here and there. Please be vocal over on the [PeerPiper issue tracker](https://github.com/DougAnderson444/peerpiper.io/issues).

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FDougAnderson444%2Fpeerpiper.io.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FDougAnderson444%2Fpeerpiper.io?ref=badge_large)
