<script>
  import { onMount } from "svelte";
  import { goto } from '@sapper/app';

  import PGraphic from "../graphics/p.svelte";
  // stores
  import { appSection } from "../../js/stores.js";

  let host = "localhost:3000";
	onMount(async () => {
		host = window.location.hostname;
		host += window.location.hostname.includes("localhost") ? ":3000" : "";
  });
  
  const loadApp = async () => {
    await goto(`http://app.${host}`);
  }

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
  <PGraphic />
  <h1 class="title">You've discovered PeerPiper.io</h1>
  <p class="description">
    We're designing your ultimate personal data sink. Save once, pipe out to
    your peers.
  </p>
  <br />
  <button on:click|preventDefault={()=>(loadApp())}>
    Launch
    <br />Alpha Prototype
  </button>
</div>
