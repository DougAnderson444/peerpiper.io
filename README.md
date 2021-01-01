# PeerPiper.io

A [Sapper](https://github.com/sveltejs/sapper)-based, [Vercel]-deployed project running [HyPNS](https://github.com/DougAnderson444/HyPNS) via [HyPNS-Svelte-Component](https://github.com/DougAnderson444/HyPNS-Svelte-Component) and [IPFS Core](https://www.npmjs.com/package/ipfs-core).

## Dev Notes

This project uses Svelte as a front-end with Sapper  framework,  

This project uses vercel functions, for the vercel now functon to work, run
```bash
vercel:dev
```

For production, a community build [vercel-sapper](https://github.com/thgh/vercel-sapper) is used, so ```vercel.prod.json``` needs to replace the dev version of ```vercel.json``` since [it adds](https://github.com/thgh/vercel-sapper#options):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "vercel-sapper"
    }
  ]
}
```

## Getting started

TODO

### Using PeerPiper

TODO

## Bugs and feedback

PeerPiper is in early development, and may have the odd rough edge here and there. Please be vocal over on the [PeerPiper issue tracker](https://github.com/DougAnderson444/peerpiper.io/issues).

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FDougAnderson444%2Fpeerpiper.io.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FDougAnderson444%2Fpeerpiper.io?ref=badge_large)