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
		<h1 class="dark:text-grey-0 mb-2 mt-4 text-xl font-extrabold text-blue-500">
			Nuestros Productos
		</h1>
		<p class="mb-8 text-lg font-bold italic text-blue-400 dark:text-blue-100">
			Limpieza de Mano, Cocina, Baño
		</p>

		{#if error}
			<div class="text-red-500">{error}</div>
		{:else if products?.data?.length}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{#each products.data as product}
					<button class="rounded-lg text-left" onclick={() => handleProductClick(product)}>
						<!-- Full Image -->
						{#if product?.images && product.images.length}
							<div class="w-full overflow-hidden rounded-lg shadow-md">
								<img
									src={IMAGE_BASE + product.images[0]?.url}
									alt={product.title}
									class="h-auto w-full object-contain"
								/>
							</div>
						{/if}

						<!-- Product Details -->
						<h2 class="dark:text-grey-0 mb-1 mt-4 font-medium text-blue-500">
							{product.title}
						</h2>
						<p class="mb-1 font-medium text-blue-200 dark:text-blue-300">
							{product.category}
						</p>
						<p class="text-grey-300 dark:text-grey-500 font-medium">
							{product.subcategory}
						</p>
					</button>
				{/each}
			</div>
		{:else}
			<p>No products available at the moment.</p>
		{/if}
	</div>
</main>
