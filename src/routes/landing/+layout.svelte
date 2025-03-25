<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../../app.postcss';
</script>

<div class="app font-raleway dark:bg-grey-1100">
	<Header
		customClasses={' ' +
			' dark:bg-gradient-to-t dark:from-[rgba(10,71,96,0)] dark:from-0% dark:via-30% dark:to-100% dark:via-[rgba(10,71,96,0.5)] dark:to-[rgba(10,71,96,1)] ' +
			' from-0% via-60% to-100% bg-gradient-to-b from-[rgba(240,252,255,1)] via-[rgba(255,255,255,0.75)] to-[rgba(255,255,255,0)]'}
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
