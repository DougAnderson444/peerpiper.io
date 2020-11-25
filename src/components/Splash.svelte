<script>
  export let active;

  document.title = "You've Discovered PeerPiper";
</script>

<style>
  .hero {
    margin: 3rem 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    color: #525252;
    width: 100%;
  }

  h1 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
  }
  .description {
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
  }
  button {
    padding: 1em;
    margin: 1em;
    background-color: #8fe58c57;
    border: 2px solid #8fe58c57;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
</style>

<div class="hero">
  <center>
    <img
      width="150"
      height="150"
      layout="fixed"
      src="Peerpiper-logo.png"
      alt="peerpiper.io logo" />
  </center>
  <h1 class="title">You've discovered PeerPiper.io</h1>
  <p class="description">
    We're designing your ultimate personal data sink. Save once, pipe out to
    your peers.
  </p>
  <br />
  <button
    on:click|preventDefault={() => {
      import('./PeerPiper.svelte').then((module) => {
        active = module.default;
      });
    }}>
    Launch
    <br />Alpha Prototype
  </button>
</div>
