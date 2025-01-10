<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../../app.postcss';
</script>

<div class="app font-raleway dark:bg-background-dark">
	<Header />

	<main class="mx-auto w-full flex-1">
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
			@apply bg-white dark:bg-background-dark;
		}
		body {
			min-height: 100vh;
		}
	</style>
</svelte:head>
