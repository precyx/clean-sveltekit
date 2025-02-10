<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	export let data;

	let landingImg = '/img/landing1.jpg';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="relative h-[800px] w-full">
	<!-- Full-Width Background Image -->
	<div
		class="absolute inset-0 h-full w-full bg-black bg-cover bg-center dark:opacity-50"
		style={`background-image: url(${landingImg});`}
	></div>

	<!-- Adaptive Gradient Overlay -->
	<div class="absolute inset-0 h-[800px]">
		<!-- Light Mode Gradient -->
		<div
			class="h-full w-full bg-gradient-to-t from-[rgba(240,252,255,0)] via-[rgba(255,255,255,0.85)] to-[rgba(255,255,255,1)] dark:hidden"
		></div>

		<!-- Dark Mode Gradient -->
		<div
			class="hidden h-full w-full bg-gradient-to-b from-[rgba(110,194,227,1)] via-[rgba(110,194,227,0.5)] to-[rgba(110,194,227,0)] dark:block"
		></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 px-40 py-10">
		<h1 class="text-xxl dark:text-grey-0 font-black text-blue-500">
			Limpiadores <br /> Potentes y Eficaces
		</h1>
		<div class="relative z-10 mb-6 mt-3">
			<Button>Comienza Hoy</Button>
		</div>
	</div>
</section>

<style>
</style>
