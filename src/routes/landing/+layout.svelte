<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../../app.postcss';
</script>

<div class="app font-raleway dark:bg-grey-1100">
	<Header
		customClasses={' dark:bg-blue-600 dark:bg-opacity-75 bg-opacity-75 dark:backdrop-blur-lg backdrop-blur-lg bg-white'}
	/>

	<div class=" absolute left-0 top-0 h-[100px] w-full bg-white dark:bg-blue-600"></div>

	<main class="mx-auto w-full flex-1 flex-grow">
		<slot />
	</main>

	<Footer></Footer>
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
			@apply flex min-h-screen flex-col bg-white dark:bg-black;
		}
		body {
			min-height: 100vh;
		}
	</style>
</svelte:head>
