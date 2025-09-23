<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="min-w-screen min-h-screen flex text-base-content flex-col justify-between w-full bg-base-100 pt-4"
>
	<header class="flex justify-between items-center px-8 pb-4 flex-0">
		<h1 class="font-bold text-4xl">The <span class="text-accent">Conscious</span> Tracker</h1>
		<a class="text-accent" href="https://github.com/ramadhanafif" aria-label="button">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-github-icon lucide-github"
				><path
					d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
				/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
			>
		</a>
	</header>
	<main class="h-full flex-1 mx-8">
		{@render children?.()}
	</main>
	<footer
		class="flex-0 mx-8 min-h-16 flex-col items-center gap-4 justify-center text-sm text-base-content/50"
	>
		<p>
			Made by <a href="https://afiframadhan.dev" class="underline hover:text-accent"
				>Muhammad Afif Ramadhan</a
			>
		</p>
		<p>Stockholm, Sweden, {new Date().getFullYear()}</p>
	</footer>
</div>
