<script context="module">
  export async function preload(page, session) {
    // const res = await this.fetch(`api/getRssFeed`);
    const res = await this.fetch("api/getRssFeed.js", {
      method: "GET",
    });
    const feed = await res.json();

    return { feed };
  }
</script>

<script>
  export let feed;
  import { onMount } from "svelte";
  onMount(async () => {
    if (!feed) {
      const res = await fetch("api/getRssFeed", {
        method: "GET",
      });
      feed = await res.json();
    }
    // console.log({ feed });
  });
</script>

<svelte:head>
  <title>PeerPiper Blog</title>
</svelte:head>

<h1>Recent posts</h1>

{#if feed}
  <div class="container">
    {#each feed.items as item, i}
      <a href={item.link} target="_blank">
        <div class="card">
          <h2>{item.title}</h2>
          <h5>
            {new Date(item.pubDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h5>
          <!-- <div class="" style="">
                        {@html item['content:encoded']}
                    </div> -->
        </div>
      </a>
    {/each}
  </div>
{/if}

<style>
  .container {
    display: flex;
  }
  .card {
    display: flex;
    padding: 1rem;
    margin: 1rem;
    flex-direction: column;
    border: 1px solid grey;
  }
  .card:hover {
    background-color: aquamarine;
  }
  a {
    text-decoration: none;
  }
</style>
