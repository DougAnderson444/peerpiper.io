<script>
	import { appSections } from "../components/AppSections";

	//svelte stores
	import { appSection } from "../js/stores.js";
	import { onMount } from "svelte";
	import { subdomain } from "../js/stores.js";

	let active;
	$: active = appSections[$appSection];

	onMount(async () => {
		let isDev = window.location.hostname.includes("localhost");
		let splitHost = window.location.hostname.split(".");

		if (
			(!isDev && splitHost.length === 3) ||
			(isDev && splitHost.length === 2)
		) {
			$subdomain = splitHost[0];
		}
		$appSection = $subdomain ? "PeerPiper" : "Splash";
	});
</script>

<svelte:head>
	<title>PeerPiper.io</title>
</svelte:head>

<div class="content">
	{#if active && $appSection}
		<svelte:component this={active.component} />
	{/if}
</div>
