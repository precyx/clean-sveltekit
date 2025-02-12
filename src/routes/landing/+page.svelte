<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Testimonial from '$lib/components/Testimonial.svelte';
	import IconArrow from '$lib/icons/IconArrow.svelte';
	import { goto } from '$app/navigation';
	export let data;

	let landingImg = '/img/landing1.jpg';

	let testimonials = [
		{
			img: 'http://localhost:1337/uploads/image_7_e6b0644492.png',
			title: 'Carlo H.',
			text: 'Me sorprendió lo fácil que fue hacer mis propios limpiadores en casa. Los resultados han sido muy buenos.'
		},
		{
			img: 'http://localhost:1337/uploads/image_2_0b4e64792e.png',
			title: 'Sarah P.',
			text: 'El curso me enseñó trucos sencillos y efectivos. Los productos que hice son fáciles de usar y realmente cumplen su función.'
		},
		{
			img: 'http://localhost:1337/uploads/image_2_0b4e64792e.png',
			title: 'Eduardo M.',
			text: 'El curso me enseñó trucos sencillos y efectivos. Los productos que hice son fáciles de usar y realmente cumplen su función.'
		}
	];

	const clickBeginNow = () => {
		goto('/courses');
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="relative h-[800px] w-full">
	<div class="relative z-10 h-full">
		<div class="-z-1 absolute left-0 top-0 h-full w-full bg-black"></div>
		<!-- Full-Width Background Image -->
		<div
			class="absolute inset-0 h-full w-full bg-black bg-cover bg-center dark:opacity-50"
			style={`background-image: url(${landingImg});`}
		></div>

		<!-- Adaptive Gradient Overlay -->
		<div class="absolute inset-0 h-[800px]">
			<!-- Light Mode Gradient -->
			<div
				class="h-full w-full bg-gradient-to-t from-[rgba(240,252,255,0)] via-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,1)] dark:hidden"
			></div>

			<!-- Dark Mode Gradient -->
			<div
				class="hidden h-full w-full bg-gradient-to-b from-[rgba(10,71,96,1)] via-[rgba(10,71,96,0.2)] to-[rgba(10,71,96,0)] dark:block"
			></div>
		</div>

		<!-- Content -->
		<div class="relative z-10 px-5 py-10 lg:px-40">
			<h1 class="lg:text-xxl text-xl font-black text-blue-500 dark:text-white">
				Limpiadores <br /> Potentes y Eficaces
			</h1>
			<div class="relative z-10 mb-6 mt-3">
				<Button onclick={clickBeginNow}>
					Comienza Hoy
					<IconArrow direction="right" classes="ml-2"></IconArrow>
				</Button>
			</div>
		</div>
	</div>
</section>

<!-- Additional Content Below -->

<section class="dark:bg-grey-1000 bg-white px-5 py-16 md:px-10 lg:px-20">
	<h2 class="dark:text-grey-0 mb-8 text-xl font-extrabold text-blue-500">
		Lo que dice nuestra clientes
	</h2>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
		{#each testimonials as testimonial}
			<Testimonial img={testimonial.img} title={testimonial.title} text={testimonial.text}
			></Testimonial>
		{/each}
	</div>
</section>

<style>
</style>
