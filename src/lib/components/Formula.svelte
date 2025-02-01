<script lang="ts">
	import type { Formula, Product } from '$lib/api/types.ts';
	import { PUBLIC_STRAPI_API_URL } from '$env/static/public';

	let IMAGE_BASE = PUBLIC_STRAPI_API_URL;

	let { formula, product } = $props() as {
		formula: Formula | undefined;
		product: Product | undefined;
	};
	console.log('product', product);
	console.log('formula', formula);
</script>

<div
	class="bg-grey-0 dark:bg-grey-900 dark:border-grey-700 rounded-lg border border-green-600 border-opacity-20 py-6"
>
	<div class="mb-6 flex px-6">
		{#if product?.images && product.images.length}
			<div>
				<img class="w-[100px] rounded" src={IMAGE_BASE + product?.images[0]?.url} alt="product" />
			</div>
		{/if}

		<div class="ml-4">
			<div
				class="text-productbase lg:text-productlg font-bold italic text-green-600 dark:text-green-50"
			>
				Formula 1 Litro
			</div>
			<div
				class="text-productbase lg:text-productlg font-medium italic text-green-600 dark:text-green-50"
			>
				{product?.title}
			</div>
		</div>
	</div>

	<div>
		<div>
			{#if formula?.FormulaItem.length}
				{#each formula?.FormulaItem as item}
					<div
						class="grid grid-cols-[50%,25%,25%] px-6 py-[1px] odd:bg-gray-100 dark:odd:bg-white dark:odd:bg-opacity-10"
					>
						<div class="mr-2 font-medium text-green-600 dark:text-white">
							{item.title}
						</div>
						<div class="text-grey-300 dark:text-grey-100 text-right font-medium">
							{item.percentage}
						</div>
						<div class="text-right font-medium text-green-300 dark:text-green-100">
							{item.value}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
