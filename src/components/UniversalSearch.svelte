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
  console.log({ host });

  let subdomainOk = /^(?!.{64})(?:[a-z0-9](?:[a-z0-9-_]{0,61}[a-z0-9])?)+/;
  let pageToSearch = "";
  let searchState, errorMessage, pageExists;

  const loadApp = async () => {
    const page = `http://${pageToSearch}.${host}`;
    await goto(page);
  };

  const pageSearchInputHandler = (e) => {
    pageToSearch = pageToSearch.replace(
      /[`~!@#$%^&*()|+=?;:'",.<>\{\}\[\]\\\/]/gi,
      ""
    );
    if (searchState) {
      searchState = "";
      pageExists = null;
    }
    errorMessage = "";
  };
</script>

<span>Load a Profile:</span>
<br />
<form class="form" on:submit|preventDefault={loadApp}>
  <span>
    <input
      id="create-domain"
      class={searchState}
      placeholder="myNameOrHandle"
      required
      color="#9b51e0"
      bind:value={pageToSearch}
      on:change={pageSearchInputHandler}
      on:keyup={pageSearchInputHandler}
      on:keydown={pageSearchInputHandler}
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
