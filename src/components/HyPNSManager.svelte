<script>
  import { onMount } from "svelte";

  //stores
  import {
    hypnsNode, // bound to HyPNS component, will get its value from there
    myInstance,
  } from "../js/stores.js";
  import { subdomain } from "../js/stores.js";

  /**
   * Things needed to spin up a HyPNS ecosystem:
   * 1. Import HyPNS Component
   * 2. A hypns node (an instance of the module)
   * 3. An instance of the node (a keypair linked to the node)
   */
  let HyPNSComponent;
  let wsProxy = [
    `ws://${$subdomain}.localhost:4977`, // if being run on a local machine
    "wss://super.peerpiper.io:49777",
    "wss://hyperswarm.mauve.moe",
  ];
  // Hypns node options
  let opts = {
    persist: true,
    swarmOpts: { announceLocalAddress: true, wsProxy },
  };
  let mounted;
  let handshake = "--";
  let streamProcessed = "No";
  let connections = "0";
  let peers = 0;

  onMount(() => {
    import(/* webpackChunkName: "hypns-comp" */ "hypns-svelte-component").then(
      (module) => {
        HyPNSComponent = module.default;
        mounted = true;
      }
    );
  });

  $: mounted && $hypnsNode ? open() : null;
  /**
   * 1. Everyone is a visitor first, needs a node to read from the swarm
   * 2. If I'm the owner, I need the full keypair to have write access
   */
  const open = async () => {
    // TODO: Fancier key manager
    // check for pre-existing keypair
    const existing = localStorage.getItem("keypair") || null;
    let keypair = existing ? JSON.parse(existing) : null;
    const loadingInstance = await $hypnsNode.open({ keypair }); // open a new $myInstance
    await loadingInstance.ready();
    $myInstance = loadingInstance;
    // store keypair for reload options
    // TODO: User password or 2FA option
    localStorage.setItem(
      "keypair",
      JSON.stringify({
        publicKey: $myInstance._keypair.publicKey.toString("hex"),
        secretKey: $myInstance._keypair.secretKey.toString("hex"),
      })
    );

    $hypnsNode.network.networker.on("handshake", () => (handshake = true));
    $hypnsNode.network.networker.on("peer-add", (peer) => {
      console.log(`Peer added`, peer.remotePublicKey.toString("hex"));
    });
    $hypnsNode.network.networker.swarm.on("connection", () => {
      // peers = $hypnsNode.swarmNetworker.swarm.peers;
      connections++;
    });
  };
</script>

{#if HyPNSComponent}
  <svelte:component this={HyPNSComponent} bind:hypnsNode={$hypnsNode} {opts} />
{/if}

<!-- {#if $myInstance}
  <div class="status">
    HyPNS PublicKey
    {$myInstance.publicKey}
    <br />Noise PublicKey:
    {$hypnsNode.swarmNetworker.keyPair.publicKey.toString("hex")}
    <br />Handshake:
    {handshake}
    <br />Swarm Connections:
    {connections}
  </div>
{/if}
 -->
<style>
  /* .status {
    font-size: smaller;
    padding: 1em;
    border: lightgreen 0.01em solid;
    margin: 1em;
  } */
</style>
