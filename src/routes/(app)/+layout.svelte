<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../../app.postcss';
</script>

<Header customClasses="" />
<main class="mx-auto mt-12 w-full max-w-5xl flex-1 flex-grow px-5">
	<slot />
</main>
<Footer></Footer>

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
			@apply dark:bg-grey-1000 flex min-h-screen flex-col bg-white font-raleway;
		}
	</style>
</svelte:head>
