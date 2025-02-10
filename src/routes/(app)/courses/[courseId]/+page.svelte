<script lang="ts">
	import { goto } from '$app/navigation';
	import { getCourses } from '$lib/api/api.js';
	import Button from '$lib/components/Button.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import PayPalButton from '$lib/components/PayPalButton.svelte';
	import type { Product } from '$lib/api/types.ts';
	import { cart, addToCart } from '$lib/stores/cart.js';
	import ImageDisplay from '$lib/components/ImageDisplay.svelte';

	export let data;
	let { course, error, courseId } = data;

	const goBack = () => {
		goto('/courses'); // Navigate back to course list
	};

	const handleProductClick = (product: Product) => {
		console.log('product', product);
		// Navigate to the product detail page
		goto(`/products/${product.documentId}`);
	};

	const _addToCart = () => {
		if (course?.data.documentId) {
			addToCart(course.data.documentId);
		}
	};
</script>

<div class="mb-6">
	<button onclick={goBack} class="dark:text-grey-0 flex items-center text-blue-500 hover:underline">
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
		Back to Courses
	</button>
</div>

{#if error}
	<div class="text-red-500">{error}</div>
{:else if course?.data}
	<div class="">
		<!-- Product Detail Layout -->
		<div class="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
			<!-- Product Image -->
			<div class="mb-8">
				<ImageDisplay
					provider={course.data.videoPreview?.provider}
					src={course.data.videoPreview?.url}
					alt={course.data.title}
					classes="mb-8 aspect-square h-[260px] w-full rounded-lg object-cover"
				/>

				<div class="text-mid dark:text-grey-0 mb-4 font-bold italic text-blue-500">
					Productos en ese curso
				</div>

				<div class="flex">
					{#each course.data?.products as product}
						<button
							class="group mr-4 h-[100px] w-[100px] rounded-lg text-left"
							onclick={() => handleProductClick(product)}
						>
							<!-- Full Image -->
							{#if product?.images && product.images.length}
								<div class="group-hover:opacity-80">
									<ImageDisplay
										provider={product.images[0]?.provider}
										src={product.images[0]?.url}
										alt={product.title}
										classes={'h-[100px] w-[100px] shadow-lg rounded inset-0 w-full object-cover'}
									></ImageDisplay>
								</div>
							{/if}

							<!-- Product Details -->
							<h2
								class="dark:text-grey-0 text-productsm mb-1 mt-2 font-medium text-blue-500 group-hover:text-blue-400 dark:group-hover:text-blue-300"
							>
								{product.title}
							</h2>
						</button>
					{/each}
				</div>
			</div>

			<!-- Product Info -->
			<div class="">
				<!-- Product Title -->
				<p class="dark:text-grey-0 text-productxl font-bold text-blue-500">
					{course.data.title}
				</p>
				<!-- Product Category -->
				<p class="text-productlg mt-2 font-semibold text-blue-200 dark:text-blue-300">
					{course.data.Category}
				</p>

				<p class="font-regular text-xl text-green-300 dark:text-green-100">
					$ {course.data.price}
				</p>

				<div class="mt-8">
					<Button onclick={_addToCart}>Agregar al carrito</Button>
				</div>

				<!-- Time to Fabricate -->
				<p class="text-productlg text-grey-300 dark:text-grey-200 mt-6 font-semibold">
					{course.data.videos.length} videos
				</p>

				<!-- Product Description -->
				<p class="dark:text-grey-100 text-grey-500 mt-6 text-base font-medium">
					<RichText content={course.data.description}></RichText>
				</p>
			</div>
		</div>
	</div>
{:else}
	<p>no content...</p>
{/if}
