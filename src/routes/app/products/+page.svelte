<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import { goto } from '$app/navigation';
	import type { Product } from '$lib/api/api.js';

	export let data;
	const { products, error } = data;

	let IMAGE_BASE = 'http://localhost:1337';

	const handleProductClick = (product: Product) => {
		goto(`/products/${product.documentId}`, {
			state: {
				documentId: product.documentId
			}
		});
	};
</script>

<main>
	<div class="mx-auto max-w-screen-xl">
		<h1 class="text-primary-light dark:text-primary-dark mb-2 text-xl font-extrabold">
			Nuestros Productos
		</h1>
		<p class="text-secondary-light dark:text-secondary-dark mb-8 text-lg font-bold italic">
			Limpieza de Mano, Cocina, Baño
		</p>

		{#if error}
			<div class="text-red-500">{error}</div>
		{:else if products?.data?.length}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{#each products.data as product}
					<div class="rounded-lg text-left" onclick={() => handleProductClick(product)}>
						<!-- Full Image -->
						<div class="w-full overflow-hidden rounded-lg shadow-md">
							<img
								src={IMAGE_BASE + product.image[0]?.url}
								alt={product.title}
								class="h-auto w-full object-contain"
							/>
						</div>

						<!-- Product Details -->
						<h2 class="text-primary-light dark:text-primary-dark mb-1 mt-4 font-semibold">
							{product.title}
						</h2>
						<p class="text-tertiary-light dark:text-tertiary-dark mb-1 font-semibold">
							{product.category}
						</p>
						<p class="text-quartiary-light dark:text-qurtiary-dark font-semibold">
							{product.subcategory}
						</p>
					</div>
				{/each}
			</div>
		{:else}
			<p>No products available at the moment.</p>
		{/if}
	</div>
</main>
