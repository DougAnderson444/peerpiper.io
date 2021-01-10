<script>
  // stores
  import { myInstance } from "../../js/stores.js";
  import EditData from "../EditData.svelte";
</script>

<svelte:head>
  <title>PeerPiper.io Profile</title>
</svelte:head>
<div>
  <p>Welcome to PeerPiper!</p>
  Your PublicKey:
  {#if $myInstance && $myInstance.publicKey}{$myInstance.publicKey}{/if}
  <br />
  <EditData />
  <br />
</div>
