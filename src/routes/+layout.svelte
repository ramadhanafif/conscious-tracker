<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { GithubIcon } from '@lucide/svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="text-base-content bg-base-300 flex min-h-screen w-full min-w-screen flex-col justify-between pt-4"
>
	<header class="flex flex-0 items-center justify-between px-8 pb-4">
		<h1 class="text-4xl font-bold">
			<a href="/">
				The <span class="text-accent">Conscious</span> Tracker
			</a>
		</h1>
	</header>
	<main class="mx-8 h-full flex-1">
		{@render children?.()}
	</main>
	<footer
		class="text-base-content/50 mx-8 my-8 flex min-h-16 flex-0 items-center justify-between gap-4 text-sm"
	>
		<div>
			<p class="decoration-accent text-accent underline">The Conscious Tracker</p>
			<p>
				Made by <a href="https://afiframadhan.dev" class="hover:text-accent underline"
					>Muhammad Afif Ramadhan</a
				>
			</p>
			<p>Stockholm, Sweden, {new Date().getFullYear()}</p>
		</div>

		<a class="text-accent self-end" href="https://github.com/ramadhanafif" aria-label="button">
			<GithubIcon />
		</a>
	</footer>
</div>
