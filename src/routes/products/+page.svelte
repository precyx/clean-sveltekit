<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import { goto } from '$app/navigation';
	import type { Product } from '$lib/api/api.js';

	export let data;
	const { products, error } = data;

	let IMAGE_BASE = 'http://localhost:1337';

	const handleProductClick = (course: Product) => {
		goto(`/products/${course.documentId}`, {
			state: {
				documentId: course.documentId
			}
		});
	};
</script>

<main>
	<div class="mx-auto max-w-screen-xl p-6">
		<h1 class="mb-2 text-title-1 font-extrabold text-title-light dark:text-title-dark">
			Nuestros Productos
		</h1>
		<p class="mb-8 text-title-2 font-bold italic text-subtitle-light dark:text-subtitle-dark">
			Limpieza de Mano, Cocina, Baño
		</p>

		{#if error}
			<div class="text-red-500">{error}</div>
		{:else if products?.data?.length}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{#each products.data as product}
					<div class="rounded-lg">
						<!-- Full Image -->
						<div class="w-full overflow-hidden rounded-lg shadow-md">
							<img
								src={IMAGE_BASE + product.image[0]?.url}
								alt={product.title}
								class="h-auto w-full object-contain"
							/>
						</div>

						<!-- Product Details -->
						<h2
							class="mb-1 mt-4 text-product-title-1 font-semibold text-productTitle-light dark:text-productTitle-dark"
						>
							{product.title}
						</h2>
						<p
							class="mb-1 text-product-title-2 font-semibold text-productTitle2-light dark:text-productTitle2-dark"
						>
							{product.category}
						</p>
						<p
							class="text-product-title-3 font-semibold text-productTitle3-light dark:text-productTitle3-dark"
						>
							{product.description}
						</p>
					</div>
				{/each}
			</div>
		{:else}
			<p>No products available at the moment.</p>
		{/if}
	</div>
</main>

<style>
	main {
		padding: 40px;
	}
</style>
