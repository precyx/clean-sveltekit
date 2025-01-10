<script lang="ts">
	import Header from './Header.svelte';
	import '../app.postcss';
</script>

<div
	class="app bg-background-light font-raleway text-title-light dark:bg-background-dark dark:text-title-dark"
>
	<Header />

	<main class="mx-auto w-full max-w-5xl flex-1 p-6">
		<slot />
	</main>
</div>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,800,700,600&display=swap"
		rel="stylesheet"
	/>

	<style>
		html,
		body {
			@apply bg-background-light text-title-light dark:bg-background-dark dark:text-title-dark;
		}
		body {
			min-height: 100vh;
		}
	</style>
</svelte:head>
