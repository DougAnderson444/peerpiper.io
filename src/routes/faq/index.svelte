<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`faq.json`)
			.then((r) => r.json())
			.then((posts) => {
				return { posts };
			});
	}
</script>

<script>
	export let posts;
	// let question;
	// let handleAskQuestion;
	// import { onMount } from "svelte";
	// onMount(() => {
	// 	handleAskQuestion = async () => {
	// 		try {
	// 			const res = await fetch("/api/askQuestion", question);
	// 			if (res.ok) {
	// 				console.log("Question submitted");
	// 				return;
	// 			} else {
	// 				console.log("[FAIL] NOT submitted");
	// 				return;
	// 			}
	// 		} catch (error) {
	// 			console.log("[FAIL] FAQ error", error);
	// 			return false;
	// 		}
	// 	};
	// });
</script>

<svelte:head>
	<title>FAQ</title>
</svelte:head>

<h1>Popular Questions</h1>

<!-- <div class="ask">
	<form class="form" on:submit|preventDefault={handleAskQuestion}>
		Don't see your question? Ask it here:
		<br />
		<input type="text" bind:value={question} />
		<input
			type="submit"
			value="Ask"
			on:click|preventDefault={handleAskQuestion}
		/>
	</form>
</div> -->

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel="prefetch" href="faq/{post.slug}">{post.title}</a></li>
	{/each}
</ul>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
	/* .ask {
		margin: 2em;
	} */
</style>
