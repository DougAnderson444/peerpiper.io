<script>
	import { appSections } from '../components/AppSections'
  
	//svelte stores
	import { appSection } from '../js/stores.js'
	import { onMount } from 'svelte'
  
	let active
	$appSection = 'Splash'
	$: active = appSections[$appSection]
  
	onMount(async () => {
	  
	})
  </script>
  
  <svelte:head>
	<title>PeerPiper.io</title>
  </svelte:head>
  
  <div class="content">
	{#if active && $appSection}
	  <svelte:component this={active.component} />
	{/if}
  
  </div>