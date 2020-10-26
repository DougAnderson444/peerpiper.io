<script>
  import { onMount } from "svelte";
  import Splash from "./components/Splash.svelte";

  let Component = [];
  Component['Splash'] = Splash; // inital page
  let active = Component['Splash'];
  let date;

  onMount(async () => {
    const res = await fetch("/api/date");
    const newDate = await res.text();
    date = newDate;
  });

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
</main>
