<script>
  import { onMount } from "svelte";

  // stores
  import { myInstance } from "../../js/stores.js";
  import EditData from "../EditData.svelte";
  let date;

  onMount(async () => {
    const res = await fetch("/api/date");
    const newDate = await res.text();
    date = newDate;
  });
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
  <h2>The date according to Node.js is:</h2>
  <p>{date ? date : 'Loading date...'}</p>
</div>
