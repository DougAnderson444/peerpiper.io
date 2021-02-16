<script>
  import { onMount } from "svelte";

  import Nav from "../components/Nav.svelte";
  import HyPNSManager from "../components/HyPNSManager.svelte";
  import IPFSManager from "../components/IPFSManager.svelte";

  import { subdomain } from "../js/stores.js";

  let mounted;
  export let segment;
  let IPFSenabled = false;

  onMount(async () => {
    let isDev = window.location.hostname.includes("localhost");
    let splitHost = window.location.hostname.split(".");

    if (
      (!isDev && splitHost.length === 3) ||
      (isDev && splitHost.length === 2)
    ) {
      $subdomain = splitHost[0];
    }
    mounted = true;
  });
</script>

{#if mounted && !$subdomain}
  <Nav {segment} />
{/if}

<main>
  <slot />
</main>

{#if mounted && $subdomain}
  <HyPNSManager />
  <IPFSManager {IPFSenabled} />
{/if}

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 0 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
