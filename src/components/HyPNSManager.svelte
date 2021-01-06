<script>
  import { onMount } from "svelte";
  //stores
  import {
    hypnsNode, // bound to HyPNS component, will get its value from there
    myInstance,
  } from "../js/stores.js";

  /**
   * Things needed to spin up a HyPNS ecosystem:
   * 1. Import HyPNS Component
   * 2. A hypns node (an instance of the module)
   * 3. An instance of the node (a keypair linked to the node)
   */
  let HyPNSComponent;
  // let wsProxy = ["wss://hyperswarm.mauve.moe"]; // "wss://super.peerpiper.io:4977",
  let opts = { persist: true }; // , swarmOpts: { wsProxy } // save the hypnsNode data to the browser

  let mounted;
  let ready;

  onMount(() => {
    import(/* webpackChunkName: "hypns-comp" */ "hypns-svelte-component").then(
      (module) => {
        HyPNSComponent = module.default;
      }
    );
    mounted = true;
  });

  $: mounted && $hypnsNode ? open() : null;

  const open = async () => {
    // TODO: Fancier key manager
    // check for pre-existing keypair
    const existing = localStorage.getItem("keypair") || null;
    let keypair = existing ? JSON.parse(existing) : null;
    const opts = { keypair };
    $myInstance = await $hypnsNode.open(opts); // open a new $myInstance
    await $myInstance.ready();
    // store keypair for reload options
    // TODO: User password or 2FA option
    localStorage.setItem(
      "keypair",
      JSON.stringify({
        publicKey: $myInstance._keypair.publicKey.toString("hex"),
        secretKey: $myInstance._keypair.secretKey.toString("hex"),
      })
    );

    ready = true;
  };
</script>

{#if HyPNSComponent}
  <svelte:component this={HyPNSComponent} bind:hypnsNode={$hypnsNode} {opts} />
{/if}
{#if $myInstance}<br /> myInstance.publicKey {$myInstance.publicKey}{/if}
