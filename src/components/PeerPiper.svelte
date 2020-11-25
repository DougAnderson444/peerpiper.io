<script>
  import { onMount, onDestroy } from "svelte";
  import HyPNS from "hypns-svelte-component";
  
  // import Splash from "./Splash.svelte";
  import Data from "./EditData.svelte";
  // import DIDManager from "./DIDManager.svelte";

  // export let active;
  let hypnsNode; // bound to HyPNS component, will get its value from there
  let ipfsNode
  let nodeId 
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

  $: if(nodeId) addHello()
  
  const addHello = async() => { 
      const resp = await ipfsNode.add('Hello world')
      cid = resp.cid
  }

</script>

<div>
  <p>Welcome to PeerPiper</p>
</div>
<HyPNS bind:hypnsNode />
<!-- <button
  on:click|preventDefault={() => {
    active = Splash;
  }}>
  Back to Splash page
</button> -->
{#if ready}
  <!-- <DIDManager {hypnsNode} /> -->
  <Data {myInstance} {hypnsNode} />
{/if}
