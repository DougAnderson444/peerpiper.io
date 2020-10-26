<script>
  import { onMount, onDestroy } from "svelte";
  import HyPNS from "HyPNS-Svelte-Component";
  import Splash from "./Splash.svelte";
  import Data from "./EditData.svelte";

  // export let active;
  let hypnsNode; // bound to HyPNS component, will get its value from there
  let myInstance;
  let ready;
  let mounted;

  document.title = "PeerPiper App";

  onMount(() => {
    mounted = true;
  });
  const open = async () => {
    myInstance = await hypnsNode.open(); // open a new myInstance
    await myInstance.ready();
    console.log("myInstance is ready!");
    ready = true;
  };
  $: mounted && hypnsNode ? open() : null;
</script>

<div><p>Welcome to PeerPiper</p></div>
<HyPNS bind:hypnsNode />
<!-- <button
  on:click|preventDefault={() => {
    active = Splash;
  }}>
  Back to Splash page
</button> -->
{#if ready}
  <Data {myInstance} {hypnsNode} />
{/if}
