<script lang="ts">
	import { cart } from '$lib/stores/cart.js';
	import { onMount } from 'svelte';
	import { getCoursesByIds } from '$lib/api/api.js';
	import type { Course, ApiResponse } from '$lib/api/types.ts';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';
	import { PUBLIC_STRAPI_API_URL } from '$env/static/public';
	import Button from '$lib/components/Button.svelte';

	let IMAGE_BASE = PUBLIC_STRAPI_API_URL;
	let courses: ApiResponse<Course[]> | undefined = $state(undefined);

	let totalPrice = $derived.by(() => {
		let total = 0;
		courses?.data.forEach((course) => {
			total += course.price;
		});
		return total;
	});

	// onmount getCoursesByIds
	onMount(() => {
		if ($cart.items.length === 0) return;
		getCoursesByIds($cart.items).then((data) => {
			courses = data;
		});
	});

	const removeCartItem = (documentId: string) => {
		// update cart store
		cart.update((data) => {
			const updatedItems = data.items.filter((item) => item !== documentId);
			return { items: updatedItems };
		});
		// update courses
		if (!courses) return;
		courses = {
			data: courses.data.filter((course) => course.documentId !== documentId),
			meta: courses.meta
		};
	};
</script>

<div class="mb-10">
	<h1 class="dark:text-grey-0 mb-2 mt-4 text-xl font-extrabold text-blue-500">
		Carrito de compras
	</h1>
	<h2 class="text-productbase mb-8 font-bold italic text-blue-400 dark:text-blue-100 lg:text-lg">
		{$cart.items.length} articulos
	</h2>
</div>

{#if courses}
	{#each courses.data as course}
		<div
			class="mb-4 grid grid-cols-1 items-start gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[180px,1fr,1fr,1fr]"
		>
			<div class="dark:bg-grey-900 overflow-hidden group-hover:opacity-80">
				{#if course.videoPreview?.url}
					<ImageDisplay
						src={IMAGE_BASE + course.videoPreview?.url}
						alt={course.title}
						classes={'rounded-lg shadow-md'}
					></ImageDisplay>
				{:else}
					<div class="flex h-40 w-full items-center justify-center bg-gray-300">
						<p class="text-gray-500">No Image Available</p>
					</div>
				{/if}
			</div>
			<div class="col-span-2 ml-4">
				<h2 class="dark:text-grey-0 mb-1 font-semibold text-blue-500">{course.title}</h2>
				<p class="text-grey-300 font-normal">{course.category}</p>
				<p class="mt-1 text-base font-medium text-green-300 dark:text-green-100">
					$ {course.price}
				</p>
			</div>
			<div class="flex items-start">
				<button class="ml-4 text-red-500" onclick={() => removeCartItem(course.documentId)}
					>Eliminar</button
				>
			</div>
		</div>
	{/each}

	{#if courses && courses.data.length > 0}
		<div class="mb-12 mt-12 flex h-[40px] items-center justify-center">
			<div
				class="bg-grey-50 dark:bg-grey-900 text-productlg flex h-full items-center rounded-full px-12 text-center"
			>
				<div class="mr-2 font-semibold text-blue-500 dark:text-white">Total:</div>
				<div class="font-semibold text-green-300 dark:text-green-100">
					$ {totalPrice}
				</div>
			</div>
			<div class="ml-4">
				<Button>Pagar</Button>
			</div>
		</div>
	{/if}
{:else}
	<p class="text-red-500">No hay cursos en el carrito</p>
{/if}
