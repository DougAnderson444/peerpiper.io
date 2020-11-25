<script>
  import { onMount } from "svelte";
  import Splash from "./components/Splash.svelte";

  let Component = [];
  Component['Splash'] = Splash; // inital page
  let active = Component['Splash'];
  let date;
  let IPFSComp;
  let ipfsLoaded;
  let mounted = false;

  onMount(async () => {
    mounted = true;
    const res = await fetch("/api/date");
    const newDate = await res.text();
    date = newDate;
  });

  // $: mounted ? importIPFS() : null;


</script>

<style>

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  {#if active}
    <svelte:component this={active} bind:active />
  {/if}
  {#if ipfsLoaded}
    <svelte:component this={IPFSComp} />
  {/if}
</main>
