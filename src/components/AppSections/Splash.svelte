<script>
  import PGraphic from "../graphics/p.svelte";
  import UniversalSearch from "../UniversalSearch.svelte";
  import Autocomplete from "../Autocomplete.svelte";
  import PeerStream from "../graphics/PeerStream.svelte";
  import GetInvited from "../graphics/GetInvited.svelte";
</script>

<div class="hero">
  <PGraphic />
  <h1 class="title">The easiest way to automatically stay in touch.</h1>
  <br />
  <PeerStream />
  <p class="description">
    Save anything once, pipe updates to your peers from the privacy of your own
    devices.
  </p>
  <p class="description">🐉 This is still a "pre-alpha version" prototype 🐉</p>
  <GetInvited />
  <!-- <div>
    <Autocomplete />
  </div> -->
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
