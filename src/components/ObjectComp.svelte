<script>
  export let breadcrumbs = []; // keys that lead back to the top
  export let key;
  export let val;
  export let expanded = false;

  function toggle() {
    expanded = !expanded;
  }
</script>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div>
  <span class:menuclosed={!expanded} on:click={toggle} />
  <span class:expanded on:click={toggle}>{key}</span>
  {#if expanded}
    <ul>
      {#each [...Object.entries(val).sort()] as [key, val]}
        <li>
          {#if typeof val === "object"}
            <svelte:self {key} {val} breadcrumbs={breadcrumbs.concat(key)} />
          {:else}{key != "value" ? key : ""}: {val}{/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  span {
    background-size: 1em 1em;
    font-weight: bold;
    cursor: pointer;
  }
  .menuclosed:before {
    content: "\f07b";
    font: normal normal normal 1.5em/1 FontAwesome;
    color: #ccc;
    padding-right: 0.1em;
    margin-right: 0.1em;
  }
  .expanded:before {
    content: "\f07c";
    font: normal normal normal 1.5em/1 FontAwesome;
    color: #ccc;
    padding-right: 0.1em;
    margin-right: 0.1em;
  }

  ul {
    padding: 0.2em 0 0 0em;
    margin: 0 0 0 0em;
    list-style: none;
    border-left: 1px solid #ddd;
  }

  li {
    padding: 0.2em 0;
    margin: 0.15em 1em;
  }
  div {
    text-align: left;
  }
</style>
