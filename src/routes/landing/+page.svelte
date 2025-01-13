<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Testimonial from '$lib/components/Testimonial.svelte';
	export let data;

	let i1 =
		'http://localhost:1337/uploads/u1599917863_A_clean_bright_scene_showing_homemade_cleaning_pr_d9a767b4_e857_4476_9061_9d85cc14c7f0_3_c746e968d0.png';
	let i2 =
		'http://localhost:1337/uploads/u1599917863_A_clean_small_indoor_workspace_for_creating_homem_dca3425c_3b5e_4f7a_8a0f_12760997651b_2_7f8ebf6f80.png';
	let i3 =
		'http://localhost:1337/uploads/u1599917863_A_clean_small_indoor_workspace_for_creating_homem_cfec75b5_f1a9_487f_8d2d_cf265969c54a_2_ea686c46ad.png';
	let i4 =
		'http://localhost:1337/uploads/u1599917863_A_clean_small_indoor_workspace_for_creating_homemad_231869ce_b4e5_40da_a728_0383565c77ee_a1338292df.png';
	let i5 =
		'http://localhost:1337/uploads/u1599917863_A_clean_small_indoor_workspace_for_creating_homemad_2e9e585f_2e62_4904_80f8_7ec0d704e838_6aaeb5bdcb.png';

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
			title: 'Sarah P.',
			text: 'El curso me enseñó trucos sencillos y efectivos. Los productos que hice son fáciles de usar y realmente cumplen su función.'
		}
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="relative h-[800px] w-full">
	<!-- Full-Width Background Image -->
	<div
		class="absolute inset-0 h-full w-full bg-black bg-cover bg-center dark:opacity-50"
		style={`background-image: url(${i5});`}
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
	<div class="relative z-10 px-40 py-10">
		<h1 class="text-xxl font-black text-blue-500 dark:text-white">
			Limpiadores <br /> Potentes y Eficaces
		</h1>
		<div class="relative z-10 mb-6 mt-3">
			<Button>Comienza Hoy</Button>
		</div>
	</div>
</section>

<!-- Additional Content Below -->

<section class="bg-white px-20 py-16 dark:bg-gray-900">
	<h2 class="dark:text-grey-0 mb-8 text-xl font-extrabold text-blue-500">
		Lo que dice nuestra clientes
	</h2>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(300px,_1fr)_1fr]">
		{#each testimonials as testimonial}
			<Testimonial img={testimonial.img} title={testimonial.title} text={testimonial.text}
			></Testimonial>
		{/each}
	</div>
</section>

<section class="bg-white px-4 py-16 dark:bg-gray-900">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200">Explore More</h2>
		<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
			Scroll down to find more information and content about our services, products, and resources.
			This section demonstrates a scrollable layout with responsive design.
		</p>
		<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
			Scroll down to find more information and content about our services, products, and resources.
			This section demonstrates a scrollable layout with responsive design.
		</p>
		<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
			Scroll down to find more information and content about our services, products, and resources.
			This section demonstrates a scrollable layout with responsive design.
		</p>
		<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
			Scroll down to find more information and content about our services, products, and resources.
			This section demonstrates a scrollable layout with responsive design.
		</p>
	</div>
</section>

<style>
</style>
