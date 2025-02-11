<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import { goto } from '$app/navigation';
	import type { Product } from '$lib/api/types.ts';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';

	export let data;
	const { products, error } = data;

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
		<h1 class="dark:text-grey-0 mt-4 text-lg font-extrabold text-blue-500 lg:text-xl">
			Nuestros Productos ({products?.data?.length})
		</h1>
		<p
			class="text-productbase mb-4 font-bold italic text-blue-400 dark:text-blue-100 lg:mb-8 lg:text-lg"
		>
			Limpieza de Mano, Cocina, Baño
		</p>

		{#if error}
			<div class="text-red-500">{error}</div>
		{:else if products?.data?.length}
			<div class="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{#each products.data as product}
					<button class="group rounded-lg text-left" onclick={() => handleProductClick(product)}>
						<!-- Full Image -->

						<div class="w-full overflow-hidden group-hover:opacity-80">
							<ImageDisplay
								provider={product?.images?.[0]?.provider}
								src={product?.images?.[0]?.url}
								alt={product.title}
								classes="h-auto w-full max-w-[250px] rounded-lg object-contain shadow-md"
							/>
						</div>

						<div>
							<!-- Product Details -->
							<h2
								class="dark:text-grey-0 mb-1 mt-4 font-medium text-blue-500 group-hover:text-blue-400 dark:group-hover:text-blue-300"
							>
								{product.title}
							</h2>
							<p class="dark:text-grey-500 mb-1 text-base font-normal text-blue-200">
								{product.category}
							</p>
							<p class="text-grey-300 font-medium dark:text-blue-300">
								{product.subcategory}
							</p>
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<p>No products available at the moment.</p>
		{/if}
	</div>
</main>
