<script>
	import { onMount } from "svelte";

	export let segment;
	let host = "localhost:3000";
	onMount(async () => {
		host = window.location.hostname;
		host += window.location.hostname.includes("localhost") ? ":3000" : "";
	});
</script>

<style>
	header {
		box-shadow: 0 -0.4rem 0.9rem 0.2rem rgba(0, 0, 0, 0.5);
		margin-bottom: 2em;
	}
	nav {
		border-bottom: 1px solid rgba(58, 179, 47, 0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: "";
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: "";
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(58, 179, 47);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
	.home {
		position: relative;
		top: 0.85rem;
		left: 0.25rem;
		width: 1.5rem;
		height: 0rem;
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		background: 0 50% no-repeat;
		background-size: auto 100%;
		text-indent: -9999px;
	}
</style>

<header>
	<nav>
		<ul>
			<li>
				<a
					rel="prefetch"
					href="."
					class="home"
					title="Homepage"
					style="background-image:url(p.svg)">Home</a>
			</li>
			<li>
				<a
					aria-current={segment === 'app' ? 'page' : undefined}
					href="http://app.{host}">app</a>
			</li>
			<li>
				<a
					rel="prefetch"
					aria-current={segment === 'rss' ? 'page' : undefined}
					href="rss">blog</a>
			</li>
			<li>
				<a
					aria-current={segment === 'about' ? 'page' : undefined}
					href="about">about</a>
			</li>
			<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
			 the blog data when we hover over the link or tap it on a touchscreen -->
		</ul>
	</nav>
</header>
