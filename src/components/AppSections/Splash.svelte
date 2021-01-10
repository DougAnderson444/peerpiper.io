<script>
  import PGraphic from "../graphics/p.svelte";
  import UniversalSearch from "../UniversalSearch.svelte";
</script>

<style>
  .hero {
    margin: 3rem 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    color: #525252;
    width: 100%;
    text-align: center;
  }

  h1 {
    font-weight: bold;
  }
  .description {
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
  }
  /* button {
    padding: 1em;
    margin: 1em;
    background-color: #8fe58c57;
    border: 2px solid #8fe58c57;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .small {
    font-size: 0.5rem;
  } */
</style>

<div class="hero">
  <PGraphic />
  <h1 class="title">You've discovered PeerPiper.io</h1>
  <p class="description">
    We're designing your ultimate personal data sink. Save once, pipe infinite
    automated updates to your peers.
  </p>
  <p class="description">
    This is still a "pre-alpha version" prototype, but we're super excited about
    continuously making it better.
  </p>
  <br />
  <UniversalSearch />
</div>
