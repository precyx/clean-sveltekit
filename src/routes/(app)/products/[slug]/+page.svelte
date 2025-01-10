<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
	let { product, error, slug } = data;

	let IMAGE_BASE = 'http://localhost:1337';

	const goBack = () => {
		goto('/products');
	};
</script>

<div class="mb-6">
	<button
		on:click={goBack}
		class="text-primary-light dark:text-primary-dark flex items-center hover:underline"
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
			<div>
				<img
					src={IMAGE_BASE + product.data.image[0]?.url}
					alt={product.data.title}
					class="aspect-square w-full rounded-lg object-cover"
				/>
			</div>

			<!-- Product Info -->
			<div class="">
				<!-- Product Title -->
				<p class="text-productxl text-primary-light dark:text-primary-dark font-semibold">
					{product.data.title}
				</p>

				<!-- Product Category -->
				<p class="text-productlg text-tertiary-light dark:text-tertiary-dark mt-2 font-semibold">
					{product.data.category}
				</p>

				<!-- Time to Fabricate -->
				<p class="text-productlg text-quartiary-light dark:text-quartiary-dark mt-2 font-semibold">
					{product.data.subcategory}
				</p>

				<!-- Product Description -->
				<p class="dark:color-text-dark text-text-soft mt-6 text-base font-medium">
					{product.data.description}
				</p>

				<!-- Cursos Section -->
				<h3 class="text-primary-light dark:text-primary-dark mt-4 text-lg font-extrabold italic">
					Cursos
				</h3>
			</div>
		</div>
	</div>
{:else}
	<p>no content...</p>
{/if}
