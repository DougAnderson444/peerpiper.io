<script>
  // This search bar should autocomplete against the username database
  // and bring up either that account (if found) or make a new account
  // if it doesn't exists

  // 1. First just either load new or load saved
  // 2, Next do autocomplete to see what's available
  import { stores, goto } from "@sapper/app";

  import CreateButton from "./CreateButton.svelte";

  const { page } = stores();
  export let host = $page.host;

  let subdomainOk = /^(?!.{64})(?:[a-z0-9](?:[a-z0-9-_]{0,61}[a-z0-9])?)+/;
  let search = "";
  let searchState, errorMessage, pageExists;

  const loadApp = async () => {
    const page = `http://${search}.${host}`;
    await goto(page);
  };

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }

  const searchInputHandler = async () => {
    search = search.replace(/[`~!@#$%^&*()|+=?;:'",.<>\{\}\[\]\\\/]/gi, "");

    if (searchState) {
      searchState = "";
      pageExists = null;
    }

    errorMessage = "";

    try {
      const res = await fetch("/api/searchName", search);
      if (res.ok) {
        console.log("Response from super peer", { r });
        return await res.json();
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

<form class="form" on:submit|preventDefault={loadApp}>
  <span>
    <input
      id="create-domain"
      class={searchState}
      placeholder="myNameOrHandle"
      required
      color="#9b51e0"
      bind:value={search}
      on:change={searchInputHandler}
      on:keyup={searchInputHandler}
      on:keydown={searchInputHandler}
    />
    <span class="suffix" />
    <br />
    <CreateButton on:click={loadApp} {searchState} />
  </span>
</form>
{#if errorMessage}
  <br />
  <div class="error-message">
    <span id="error-message">{errorMessage}</span>
  </div>
{/if}
{#if pageExists}
  <br />
  <span class="page-exists">
    🚨
    <a href={`https://${pageExists.name}`}>{pageExists.name}</a>
    taken! Try another one.
  </span>
{/if}

<style>
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
  input.ERROR {
    border-color: #f3424d;
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
  .page-exists,
  .error-message {
    color: red;
    padding: 0.25em;
    font-family: Menlo, monospace;
    text-transform: uppercase;
    text-align: center;
    font-size: 0.8em;
  }
  .page-exists a {
    color: red;
  }
</style>
