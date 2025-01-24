<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
	let { product, error, productId } = data;

	let IMAGE_BASE = 'http://localhost:1337';

	const goBack = () => {
		goto('/products');
	};
</script>

<div class="mb-6">
	<button
		on:click={goBack}
		class="dark:text-grey-0 flex items-center text-blue-500 hover:underline"
	>
		<!-- Back Arrow Icon -->
		<svg
			class="mr-2 h-5 w-5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
			></path>
		</svg>
		Back to Products
	</button>
</div>

{#if error}
	<div class="text-red-500">{error}</div>
{:else if product?.data}
	<div class="">
		<!-- Product Detail Layout -->
		<div class="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
			<!-- Product Image -->

			{#if product?.data.images && product.data.images.length}
				<div>
					<img
						src={IMAGE_BASE + product.data.images[0]?.url}
						alt={product.data.title}
						class="aspect-square w-full rounded-lg object-cover"
					/>
				</div>
			{/if}

			<!-- Product Info -->
			<div class="">
				<!-- Product Title -->
				<p class="text-productxl dark:text-grey-0 font-semibold text-blue-500">
					{product.data.title}
				</p>

				<!-- Product Category -->
				<p class="text-productlg mt-2 font-semibold text-blue-200 dark:text-blue-300">
					{product.data.category}
				</p>

				<!-- Time to Fabricate -->
				<p class="text-productlg text-grey-300 dark:text-grey-200 mt-2 font-semibold">
					{product.data.subcategory}
				</p>

				<!-- Product Description -->
				<p class="dark:color-grey-100 text-grey-100 mt-6 text-base font-medium">
					{product.data.description}
				</p>

				<!-- Cursos Section -->
				<h3 class="dark:text-grey-0 mt-4 text-lg font-extrabold italic text-blue-500">Cursos</h3>
			</div>
		</div>
	</div>
{:else}
	<p>no content...</p>
{/if}
