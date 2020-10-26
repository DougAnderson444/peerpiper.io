<script>
  import { onMount, onDestroy } from "svelte";

  // passed down from Parent component
  export let opts = {
    persist: false,
  };

  export let active; // bound to parent
  export let hypnsNode;

  onMount(() => {
    const HyPNS = window.hypns;
    hypnsNode = new HyPNS(opts);

    // Close the connections if the browser is closed
    window.addEventListener("unload", async (event) => {
      await hypnsNode.close();
    });
  });

  // this function will be called automatically when mounted svelte component is destroyed
  onDestroy(async () => await hypnsNode.close());
</script>

<div>
  <p>Import UMD script hypnsNode: <br /> {hypnsNode}</p>
</div>
