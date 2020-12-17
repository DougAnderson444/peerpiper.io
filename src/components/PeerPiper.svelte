<script>
  import { onMount, onDestroy } from "svelte";
  import HyPNS from "hypns-svelte-component";
  // import IPFSComp from "ipfs-svelte-component";

  // import Splash from "./Splash.svelte";
  import Data from "./EditData.svelte";
  // import DIDManager from "./DIDManager.svelte";

  let opts = { persist: true }; // save the hypnsNode publicKey

  // export let active;
  let hypnsNode; // bound to HyPNS component, will get its value from there
  let ipfsNode;
  let nodeId;
  let myInstance;
  let ready;
  let mounted;

  document.title = "PeerPiper App";

  onMount(() => {
    mounted = true;
  });

  $: mounted && hypnsNode ? open() : null;

  const open = async () => {
    // check for pre-existing keypair
    const existing = localStorage.getItem("keypair") || null;
    let keypair = existing ? JSON.parse(existing) : null;
    const opts = { keypair };
    myInstance = await hypnsNode.open(opts); // open a new myInstance
    await myInstance.ready();
    // store keypair for reload options
    // TODO: User password or 2FA option
    localStorage.setItem(
      "keypair",
      JSON.stringify({
        publicKey: myInstance._keypair.publicKey.toString("hex"),
        secretKey: myInstance._keypair.secretKey.toString("hex"),
      })
    );

    ready = true;
  };

  $: mounted && nodeId ? addHello() : null;
</script>

<div>
  <p>Welcome to PeerPiper</p>
</div>
<HyPNS bind:hypnsNode {opts} />
<!-- IPFS:
<br />
<div>
  <IPFSComp bind:ipfsNode bind:nodeId />
</div> -->
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
{#if nodeId}nodeId: {nodeId}{/if}
