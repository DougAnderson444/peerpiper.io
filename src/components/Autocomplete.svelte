<script>
  import { stores, goto } from "@sapper/app";
  import { onMount } from "svelte";
  import CreateButton from "./CreateButton.svelte";

  const { page } = stores();
  let host = $page.host;

  let subdomainOk = /^(?!.{64})(?:[a-z0-9](?:[a-z0-9-_]{0,61}[a-z0-9])?)+/;
  let search = "";

  let list;
  let input;
  let isOpen = false;
  let arrowCounter = 0;
  let isLoading = false;
  let fromStart = true; // Default type ahead
  let maxItems = 5;
  let searchResults;
  let results;
  let available = false;

  let searchInputHandler;

  const loadApp = async () => {
    const page = `http://${search}.${host}`;
    await goto(page);
  };

  const onChange = async () => {
    isOpen = true;
    search = search
      .replace(/[`~!@#$%^&*()|+=?;:'",.<>\{\}\[\]\\\/\s]/gi, "")
      .toLowerCase();

    if (search) {
      searchResults = await searchInputHandler(search);
      filterResults();
    } else {
      searchResults = "";
      results = "";
      isOpen = false;
    }
  };

  const regExpEscape = (s) => {
    return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
  };

  function filterResults() {
    results = searchResults
      .filter((item) => {
        if (typeof item !== "string") {
          item = item.key || ""; // Silent fail
        }
        return fromStart
          ? item.toUpperCase().startsWith(search.toUpperCase())
          : item.toUpperCase().includes(search.toUpperCase());
      })
      .map((item) => {
        const text = typeof item !== "string" ? item.key : item;
        return {
          key: text,
          // value: item.value || item,
          label:
            search.trim() === ""
              ? text
              : text.replace(
                  RegExp(regExpEscape(search.trim()), "i"),
                  "<span>$&</span>"
                ),
        };
      });
    const height = results.length > maxItems ? maxItems : results.length;
    list.style.height = `${height * 2.25}rem`;
    available = results.length > 0 ? false : true;
    isLoading = false;
  }

  function onKeyDown(event) {
    if (event.keyCode === 40 && arrowCounter < results.length) {
      // ArrowDown
      arrowCounter = arrowCounter + 1;
    } else if (event.keyCode === 38 && arrowCounter > 0) {
      // ArrowUp
      arrowCounter = arrowCounter - 1;
    } else if (event.keyCode === 32) {
      // Space
      event.preventDefault();
    } else if (event.keyCode === 13) {
      // Enter
      event.preventDefault();
      if (arrowCounter === -1) {
        arrowCounter = 0; // Default select first item of list
      }
      close(arrowCounter);
    } else if (event.keyCode === 27) {
      // Escape
      event.preventDefault();
      console.log("Escape", arrowCounter, event.keyCode);
      close();
    }
  }

  function close(index = -1) {
    isOpen = false;
    arrowCounter = -1;
    input.blur();
    if (index > -1) {
      const { key, value } = results[index];
      search = key;
    } else if (!value) {
      search = "";
    }
  }

  onMount(async () => {});

  searchInputHandler = async () => {
    isLoading = true;
    search = search.replace(/[`~!@#$%^&*()|+=?;:'",.<>\{\}\[\]\\\/]/gi, "");

    try {
      const res = await fetch(`/api/searchName?search=${search}`);
      if (res.ok) {
        const r = await res.json();
        console.log("Response from hyperbee super peer", { r });
        return r;
      } else {
        console.log("[FAIL] NOT searched from super peer");
        return false;
      }
    } catch (error) {
      console.log(error);
      console.log("[FAIL] NOT searched from super peer");
      return false;
    }
  };
</script>

<svelte:window
  on:click={() => {
    isOpen = false;
  }}
/>

<svelte:head>
  <!-- <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css"
  /> -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
</svelte:head>

<form class="form" on:submit|preventDefault={loadApp}>
  <label class="label" for="autocomplete"><b>Pick a Profile</b></label>
  <div on:click|stopPropagation class="autocomplete">
    <input
      type="text"
      id="search"
      name="search"
      bind:value={search}
      on:input={onChange}
      on:focus={() => {
        if (results && results.length > 0) isOpen = true;
      }}
      on:keydown={onKeyDown}
      placeholder="Search"
      bind:this={input}
      autocomplete="off"
    /><span class={available ? "available" : "hidden"}>Available</span>

    <ul
      class="autocomplete-results{!isOpen || (results && results.length < 1)
        ? ' hide-results'
        : ''}"
      bind:this={list}
    >
      {#if results}
        {#each results as result, i}
          <li
            on:click={() => close(i)}
            class="autocomplete-result{i === arrowCounter ? ' is-active' : ''}"
          >
            {@html result.label}
            <!-- {result.value} -->
            <span class="taken">Taken</span>
          </li>
        {/each}
      {:else}
        <slot name="fallback">
          <span class="fallback">Loading data...</span>
        </slot>
      {/if}
    </ul>
  </div>

  <div class="suffix">
    <br />
    <CreateButton on:click={loadApp} />
  </div>
</form>

<style>
  /* .container {
    max-width: 192px;
    text-align: center;
  } */
  * {
    box-sizing: border-box;
  }

  input {
    border-color: #ccc;
    width: 50vw;
    min-width: 100px;
    max-width: 480px;
    padding: 1rem;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  form {
    flex: 0;
    display: inline-block;
    align-items: center;
    text-align: center;
    margin-top: 1px;
    margin-bottom: 1px;
    white-space: nowrap;
    min-height: 10px;
  }
  form .suffix {
    font-weight: bold;
    font-size: 16px;
    margin-left: 1px;
    margin-right: 1px;
  }

  .autocomplete {
    position: relative;
  }

  .hide-results {
    display: none;
    visibility: hidden;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #dbdbdb;
    height: 6rem;
    overflow: auto;
    width: 100%;

    background-color: white;
    box-shadow: 2px 12px 24px rgba(0, 0, 0, 0.2);
    position: absolute;
    z-index: 100;
  }

  .autocomplete-result {
    color: #7a7a7a;
    list-style: none;
    text-align: left;
    height: 2rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

  .autocomplete-result > :global(span) {
    background-color: none;
    color: #242424;
    font-weight: bold;
  }

  .autocomplete-result > :global(span.taken) {
    background-color: none;
    color: #e53935;
    font-weight: bold;
    position: absolute;
    right: 10px;
  }

  span.available {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: none;
    color: #2ea521;
    font-weight: bold;
  }
  .hidden {
    visibility: hidden;
    display: none;
    width: 0px;
  }
  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #dbdbdb;
  }
</style>
