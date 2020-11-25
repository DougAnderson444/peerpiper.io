<script>
  //svelte stores
  import { onMount } from "svelte";  
  
  import * as node from "../js/ipfsNode.js";

  export let ipfsNode;
  let subdomain = "www";
  let nodeId;

  onMount(async () => {
    console.log("IPFS COMP loaded");
    let isDev = window.location.hostname.includes("localhost");
    let splitHost = window.location.hostname.split(".");
    console.log({ isDev });

    if (
      (!isDev && splitHost.length === 3) ||
      (isDev && splitHost.length === 2)
    ) {
      subdomain = splitHost[0];
    }
    if (!subdomain) subdomain = "www";

    try {
      ipfsNode = await node.get(subdomain);
      console.log({ ipfsNode });
      nodeId = (await ipfsNode.id()).id;
      console.log({ nodeId });
      const peerInfos = await ipfsNode.swarm.peers();
      console.log(`Peers are `, peerInfos);
    } catch (error) {
      console.log(error);
    }
  });
</script>

<style>
  .tiny {
    font-size: 0.7rem;
    margin: 1em;
    padding: 1em;
  }
</style>

{#if subdomain && nodeId}
  {#await nodeId then nodeId}
    <div class="tiny">
      <br />
      <p>IPFS is running, NodeId: {nodeId}</p>
    </div>
  {/await}
{/if}
