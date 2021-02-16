<script>
  // stores
  import { myInstance } from "../../js/stores.js";
  import EditData from "../EditData.svelte";
  // import DIDManager from "../DIDManager.svelte";

  /**
   * When a subdomain is first created, we need to 
   * 1. Take the hypercore device seed and authorize it on the DID  
      a. check to see if this subdomain is already claimed: database]
      (if claimed:)
      b. show from a guest node
      (if not claimed:)
      a. make Hypns for this subdomain
      b. get seed
      c. make device material
      d. write it to DID
      e. associate the DID with this subdomain (dnslink)
      f. assume most users will spend time at their own subdomain since their contacts data is rolled up there anyway 
   */
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
  <!-- <DIDManager /> -->
</div>
