<script>
  import PGraphic from "../graphics/p.svelte";
  import UniversalSearch from "../UniversalSearch.svelte";
  import Autocomplete from "../Autocomplete.svelte";
</script>

<div class="hero">
  <PGraphic />
  <h1 class="title">You've discovered PeerPiper.io</h1>
  <h2>Conveniently control your data.</h2>
  <br />
  <p class="description">Save anything once, pipe updates to your peers.</p>
  <p class="description">🐉 This is still a "pre-alpha version" prototype 🐉</p>
  <br />
  <div>
    <Autocomplete />
  </div>
</div>

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
